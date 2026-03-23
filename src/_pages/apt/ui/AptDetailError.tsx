import { AlertCircle } from "lucide-react";

type Props = {
  message?: string;
};

export function AptDetailError({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#ffe0e0] bg-[#fff5f5] py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffe0e0]">
        <AlertCircle size={22} className="text-[#f04452]" />
      </div>
      <p className="mt-4 text-base font-bold text-[#191f28]">리포트를 불러오지 못했습니다</p>
      <p className="mt-2 text-sm text-[#8b95a1]">{message ?? "알 수 없는 오류가 발생했습니다."}</p>
    </div>
  );
}

