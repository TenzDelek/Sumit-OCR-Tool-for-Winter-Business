import { createWorker } from 'tesseract.js';

const converter = async (img) => {
    try {
        const worker = await createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(img);
        await worker.terminate();

        const numbersOnly = text.match(/\d+/g);
        if (numbersOnly) {
            console.log(numbersOnly)
            return numbersOnly.map(Number);
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error during text recognition:", error);
        return [];
    }
};

export default converter;
