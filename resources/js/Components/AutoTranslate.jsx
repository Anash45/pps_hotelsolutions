import { useEffect, useState, useRef } from "react";
import { useAutoTranslate } from "@/context/AutoTranslateProvider";

export default function AutoTranslate({ text }) {
    const context = useAutoTranslate();
    const lang = context?.lang || null; // null if provider missing

    const [translated, setTranslated] = useState(text);
    const [loading, setLoading] = useState(false);

    const originalText = useRef(text);
    const translationCache = useRef({}); // cache translations

    useEffect(() => {
        originalText.current = text;
        if (!lang) setTranslated(text); // failsafe
    }, [text, lang]);

    const detectLanguage = async (line) => {
        try {
            const res = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(
                    line
                )}`
            );
            const data = await res.json();
            return data[2] || "en";
        } catch {
            return "en";
        }
    };

    const translateLine = async (line, sourceLang, targetLang) => {
        const cacheKey = `${sourceLang}->${targetLang}:${line}`;
        if (translationCache.current[cacheKey])
            return translationCache.current[cacheKey];

        try {
            const res = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(
                    line
                )}`
            );
            const data = await res.json();
            const translatedLine = data[0][0][0];
            translationCache.current[cacheKey] = translatedLine;
            return translatedLine;
        } catch {
            return line;
        }
    };

    const translateHTML = async (html) => {
        // Regex to match text nodes but skip tags and attributes
        const regex = />([^<]+)</g;
        const matches = [...html.matchAll(regex)];
        let result = html;

        for (let match of matches) {
            const originalText = match[1].trim();
            if (!originalText) continue;

            const detectedLang = await detectLanguage(originalText);
            let translatedText = originalText;
            if (detectedLang !== lang) {
                translatedText = await translateLine(
                    originalText,
                    detectedLang,
                    lang
                );
            }
            // Replace original text in HTML with translated
            result = result.replace(originalText, translatedText);
        }
        return result;
    };

    useEffect(() => {
        if (!lang) return;

        const processText = async () => {
            setLoading(true);
            const translatedHTML = await translateHTML(originalText.current);
            setTranslated(translatedHTML);
            setLoading(false);
        };

        processText();
    }, [lang, text]);

    return (
        <span
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{ __html: loading ? "..." : translated }}
        />
    );
}
