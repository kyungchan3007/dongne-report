"use client";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSchoolInfo } from "@/widgets/school-detail/hooks/useSchoolInfo";

type Props = {
  open: boolean;
  schoolName: string;
  schoolCode: string;
  address: string;
  onClose: () => void;
};

const TITLE: Record<string, string> = {
  "0": "학교 기본정보",
  "08": "수업일수 및 수업시수 현황",
  "62": "학교 현황",
  "63": "성별 학생수",
  "09": "학년별 학급별 학생수",
  "94": "대상별 학교폭력 예방교육 실적",
  "51": "입학생 현황",
};

export function SchoolInfoModal({ open, schoolName, schoolCode, address, onClose }: Props) {
  const { loading, error, data } = useSchoolInfo({
    open,
    schoolCode,
    schoolName,
    address,
  });

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl">
          <DialogPanel className="rounded-lg bg-white p-4 shadow-xl">
            <DialogTitle className="text-lg font-semibold">
              학교 상세 정보: {schoolName} ({schoolCode})
            </DialogTitle>

            {loading ? <p className="mt-3 text-sm">불러오는 중...</p> : null}
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

            {!loading && !error && data ? (
              <div className="mt-4 space-y-4">
                {data.results.map((result) => (
                  <section key={result.apiType} className="rounded border p-3">
                    <h4 className="font-medium">
                      [{result.apiType}] {TITLE[result.apiType] ?? "기타"}
                    </h4>
                    <p className="text-xs text-slate-500">status: {result.status}</p>
                    {result.selectedItem ? (
                      <pre className="mt-2 max-h-60 overflow-auto rounded bg-slate-50 p-2 text-xs">
                        {JSON.stringify(result.selectedItem, null, 2)}
                      </pre>
                    ) : (
                      <pre className="mt-2 max-h-60 overflow-auto rounded bg-slate-50 p-2 text-xs">{result.raw}</pre>
                    )}
                  </section>
                ))}
              </div>
            ) : null}

            <div className="mt-4 text-right">
              <button type="button" onClick={onClose} className="rounded border px-3 py-1.5 text-sm">
                닫기
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
