import { useEffect, useState, useRef } from "react";
import { useAutoTranslate } from "@/context/AutoTranslateProvider";

export default function AutoTranslate({ text }) {
    const context = useAutoTranslate(); // always call the hook
    const lang = context?.lang || null; // null if provider missing

    console.log("Lang, text: ",lang, text);

    const [translated, setTranslated] = useState(text);
    const [loading, setLoading] = useState(false);

    const originalText = useRef(text);
    const translationCache = useRef({}); // cache translations

    useEffect(() => {
        originalText.current = text;
        // if no provider, show original text only
        if (!lang) {
            setTranslated(text);
        }
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

    useEffect(() => {
        if (!lang) return; // <-- skip translation if provider missing

        const processText = async () => {
            const lines = originalText.current.split("\n");
            setLoading(true);

            const translatedLines = await Promise.all(
                lines.map(async (line) => {
                    const detectedLang = await detectLanguage(line);
                    if (detectedLang === lang) return line;
                    return translateLine(line, detectedLang, lang);
                })
            );

            setTranslated(translatedLines.join("\n"));
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
