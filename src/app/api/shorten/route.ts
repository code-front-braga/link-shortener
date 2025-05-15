import { prisma } from '@/lib/prisma/prisma-instance';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const { longUrl, desiredShortCode } = await request.json(); // Obtém o corpo da requisição como JSON e extrai a propriedade 'longUrl'

		if (!longUrl || typeof longUrl !== 'string') {
			return NextResponse.json(
				// O NextResponse.json() já define o Content-type para aplication/json e stringifica o objeto data;
				{ error: 'URL inválida fornecida.' }, // Retorna uma resposta de erro JSON
				{ status: 400 }, // Status "Bad Request"
			);
		}

		let shortCode: string | undefined = desiredShortCode;

		if (desiredShortCode && typeof desiredShortCode === 'string') {
			const linkExists = await prisma.link.findUnique({
				where: { shortCode: desiredShortCode },
			});

			if (linkExists) {
				return NextResponse.json(
					{ error: 'Código curto desejado já está em uso.' },
					{ status: 409 },
				); // Status "Conflict"
			}
		} else {
			do {
				shortCode = nanoid(8);
				const linkExists = await prisma.link.findUnique({
					where: { shortCode },
				});
				if (!linkExists) break;
			} while (true);
		}

		const baseUrl = process.env.HOST_URL;
		const shortUrl = `${baseUrl}/${shortCode}`;

		const newLink = await prisma.link.create({
			data: { longUrl, shortCode: shortCode! }, // "!" pois shortCode será definido em ambos os caminhos
		});

		return NextResponse.json(
			{ shortCode: newLink.shortCode, shortUrl, longUrl },
			{ status: 201 }, // Status "Created"
		);
	} catch (error) {
		console.error('Erro ao encurtar URL:', error);
		return NextResponse.json(
			{ error: 'Erro interno ao encurtar a URL.' },
			{ status: 500 }, // Status "Internal Server Error"
		);
	} finally {
		await prisma.$disconnect(); // Desconecta o Prisma Client para liberar a conexão com o banco de dados
	}
}
