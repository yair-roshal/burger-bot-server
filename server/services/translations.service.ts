import { Request, Response } from 'express';
import translateText from '../helpers/yandex_translate/translateText';

interface Translations {
  en: string | null;
  fr: string | null;
  he: string | null;
  ru: string | null;
}

class TranslationsService {
  async createTranslation(req: Request, res: Response): Promise<Translations | void> {
    const { text } = req.body;
 
    try {
      const en = await translateText(text, "en");
      const fr = await translateText(text, "fr");
      const he = await translateText(text, "he");
      const ru = await translateText(text, "ru");

      const allTranslations: Translations = { en, fr, he, ru };
      console.log("allTranslations :>> ", allTranslations);
      return allTranslations;
    } catch (err) {
      console.log("err_translateText() : ", err);
    }
  }
}

export default new TranslationsService();