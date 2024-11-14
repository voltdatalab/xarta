import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type LabeledInputProps = {
    id: string;
    label: ReactNode;
    placeholder: string;
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    maxLength?: number;
    required?: boolean;
};

export function LabeledInput({
    id,
    label,
    placeholder,
    value,
    onChange,
    className = '',
    maxLength,
    required = false
}: LabeledInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                required={required}
                id={id}
                placeholder={placeholder}
                value={value}
                className={cn(`bg-[#EEEDF2] text-[#3D3D3D] border-0 focus:ring-[#4B31DD]`, className)}
                onChange={(e) => onChange(e.target.value)}
                maxLength={maxLength}
            />
        </div>
    );
}
