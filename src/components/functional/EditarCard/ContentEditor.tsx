import { ReactNode, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import 'react-quill/dist/quill.snow.css';
import './quill-overrides.css';
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Dynamically import ReactQuill with ssr set to false
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type ContentEditorProps = {
    id: string;
    label: ReactNode;
    htmlContent: string;
    setHtmlContent: (html: string) => void;
    required?: boolean
};

export function ContentEditor({
    id,
    label,
    htmlContent,
    setHtmlContent,
    required = false
}: ContentEditorProps) {
    const [editorTab, setEditorTab] = useState<'textarea' | 'quill'>('quill');

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div>
                <div className="flex space-x-1">
                    <button
                        className={`text-xs py-2 px-4 ${editorTab === 'quill' ? 'bg-[#4B31DD] text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                        onClick={() => setEditorTab('quill')}
                    >
                        Editor
                    </button>
                    <button
                        className={`text-xs py-2 px-4 ${editorTab === 'textarea' ? 'bg-[#4B31DD] text-white' : 'bg-gray-200 text-gray-700'} rounded-md`}
                        onClick={() => setEditorTab('textarea')}
                    >
                        HTML
                    </button>
                </div>

                {editorTab === 'textarea' ? (
                    <Textarea
                        required={required}
                        id={id}
                        className="bg-[#EEEDF2] border-0 text-[#3D3D3D] mt-2 min-h-[240px] focus:ring-[#4B31DD]"
                        placeholder=""
                        value={htmlContent}
                        onChange={(e) => setHtmlContent(e.target.value)}
                    />
                ) : (
                    <ReactQuill
                        className={cn("bg-[#EEEDF2] rounded-md mt-2 focus:ring-[#4B31DD]")}
                        theme="snow"
                        value={htmlContent}
                        onBlur={(range, source, editor) => {setHtmlContent(editor.getHTML()) }}
                        onChange={(e) => {setHtmlContent(e) }}
                    />
                )}
            </div>
        </div>
    );
}