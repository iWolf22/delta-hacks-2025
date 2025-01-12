import { useEffect } from 'react';
import { useEditor } from 'tldraw';

export default function TldrawChild({ temp }: { temp: boolean }) {
    const editor = useEditor();

    useEffect(() => {
        if (!editor) return;

        (async () => {
            const assets = editor.getAssets();

            console.log(assets);

            var base64img = assets.map((img: any) => {
                return img.props.src;
            });

            const res = await fetch('http://localhost:5000/upload-pictures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pictures: base64img }),
            });
        })();
    }, [temp]);

    return <div></div>;
}
