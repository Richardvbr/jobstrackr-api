import { Router } from 'express';
import { getDocuments, getDocument, addDocument } from '@/controllers/document.controller';

const documentsRoute = Router();

documentsRoute.get('/', getDocuments);
documentsRoute.get('/:documentId', getDocument);
documentsRoute.post('/', addDocument);

export default documentsRoute;
