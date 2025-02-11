import { Router } from 'express';
import { getDocuments, getDocument } from '@/controllers/document.controller';

const documentsRoute = Router();

documentsRoute.get('/', getDocuments);
documentsRoute.get('/:documentId', getDocument);

export default documentsRoute;
