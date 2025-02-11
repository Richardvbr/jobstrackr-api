import type { Response, NextFunction } from 'express';
import * as DocumentService from '@/services/document.service';

export async function getDocuments(req: any, res: Response, next: NextFunction) {
  const { id } = req.user ?? {};

  try {
    const documents = await DocumentService.getDocuments(id);

    res.status(200).json({ data: documents });
  } catch (error) {
    next(error);
  }
}

export async function getDocument(req: any, res: Response, next: NextFunction) {
  const documentId = req.params.documentId;
  const { id } = req.user ?? {};

  try {
    const document = await DocumentService.getDocument(id, documentId);

    res.status(200).json({ data: document });
  } catch (error) {
    next(error);
  }
}
