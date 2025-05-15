'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios/axios-instance';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BiSolidCopy } from 'react-icons/bi';
import { BeatLoader } from 'react-spinners';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

const shortenUrlSchema = z.object({
	longUrl: z.string().url({ message: 'URL inválida.' }),
	desiredShortCode: z.string().optional(),
});

type ShortenUrlFormData = z.infer<typeof shortenUrlSchema>;

export interface ShortenUrlSuccessResponse {
	shortCode: string;
	shortUrl: string;
	longUrl: string;
	error: string;
}

export interface ShortenUrlErrorResponse {
	error: string;
}

export function LinkShortenForm() {
	const form = useForm<ShortenUrlFormData>({
		resolver: zodResolver(shortenUrlSchema),
		defaultValues: { longUrl: '', desiredShortCode: '' },
	});
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = form;
	const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [copied, setCopied] = useState<boolean>(false);

	async function handleShortenUrlSubmit(data: ShortenUrlFormData) {
		try {
			const response = await axiosInstance.post<ShortenUrlSuccessResponse>(
				'/api/shorten',
				data,
				{
					headers: { 'Content-Type': 'application/json' },
				},
			);

			if (response.status === 201) {
				setShortenedUrl(response.data.shortUrl);
				reset();
			} else {
				setErrorMessage(response.data?.error || 'Erro ao encurtar a URL.');
			}
		} catch (error: any) {
			if (error.response) {
				const errorData = error.response.data as ShortenUrlErrorResponse;
				setErrorMessage(errorData.error || 'Erro ao encurtar a URL.');
			}
		}
	}

	async function handleCopyUrl() {
		setCopied(!copied);
		await navigator.clipboard.writeText(shortenedUrl!);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(handleShortenUrlSubmit)}
				className="m-auto flex w-full max-w-2xl flex-col gap-4"
			>
				<FormField
					control={control}
					name="longUrl"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cole ou digite a URL a ser encurtada</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="desiredShortCode"
					render={({ field }) => (
						<FormItem className="w-full sm:max-w-66">
							<FormLabel>Código curto desejado</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="flex items-center gap-4"
				>
					{isSubmitting ? (
						<>
							Encurtando
							<BeatLoader size={6} color="#fff" />
						</>
					) : (
						<>Encurtar</>
					)}
				</Button>

				{errorMessage && <p className="text-red-500">{errorMessage}</p>}
				{shortenedUrl && (
					<Alert className="relative mt-4">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									type="button"
									onClick={handleCopyUrl}
									variant="ghost"
									size="icon"
									className="absolute right-0"
								>
									<BiSolidCopy color="#ea580c" />
								</Button>
							</PopoverTrigger>
							<PopoverContent side="top" className="mr-6">
								<span className="text-[#ea580c]">Copiado!</span>
							</PopoverContent>
						</Popover>
						<AlertTitle className="text-black">URL Encurtado:</AlertTitle>
						<AlertDescription className="font-semibold text-[#ea580c]">
							{shortenedUrl}
						</AlertDescription>
					</Alert>
				)}
			</form>
		</Form>
	);
}
