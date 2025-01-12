import { useEffect, useState } from 'react';
import { useEditor } from 'tldraw';

export default function TldrawChild({ temp, sendPictures }: any) {
    const editor = useEditor();

    const [a, setA] = useState(false);

    useEffect(() => {
        if (!editor) return;

        if (temp == false) {
            return;
        }

        const assets = editor.getAssets();

        var base64img = assets.map((img: any) => {
            return img.props.src;
        });

        sendPictures(base64img);
    }, [temp]);

    return <div></div>;
}
