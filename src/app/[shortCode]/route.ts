import { prisma } from '@/lib/prisma/prisma-instance';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	req: NextRequest,
	context: { params: Record<string, string> },
) {
	const { shortCode } = context.params;

	try {
		const link = await prisma.link.findUnique({ where: { shortCode } });

		if (!link)
			return NextResponse.json(
				{ error: 'Link não encontrado.' },
				{ status: 404 }, // Status "Not Found"
			);

		await prisma.link.update({
			where: { id: link.id },
			data: { click: { increment: 1 } },
		});

		return NextResponse.redirect(link.longUrl, 302); // Status "Found"
	} catch (error) {
		console.error(error);
		return new NextResponse('Erro ao redirecionar', { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
