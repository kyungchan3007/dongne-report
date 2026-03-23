import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { TITLE } from "@/entities/school/model/SchoolType";
import { useSchoolInfo } from "@/features/school-details/hooks/useSchoolInfo";
import { SchoolRenderSelected } from "@/widgets/school-detail/ui/schoolInfo/SchoolRenderSelected";

type Props = {
  open: boolean;
  schoolName: string;
  schoolCode: string;
  address: string;
  onClose: () => void;
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
      <div className="fixed inset-0 bg-[#0f172a]/45 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto p-2 sm:p-4">
        <div className="mx-auto flex min-h-full max-w-4xl items-end sm:items-center">
          <DialogPanel className="max-h-[92vh] w-full overflow-hidden rounded-t-3xl border border-[#dce7f5] bg-white shadow-[0_30px_70px_rgba(15,23,42,0.35)] sm:rounded-3xl">
            <div className="flex items-start justify-between gap-3 border-b border-[#e6eef9] px-5 py-4 sm:px-6">
              <div>
                <DialogTitle className="text-lg font-bold text-[#191f28]">{schoolName}</DialogTitle>
                <p className="mt-1 text-xs text-[#6b7684]">{address}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-[#d7e3f4] px-3 py-1.5 text-xs font-semibold text-[#4e5968] transition hover:bg-[#f5f8fc]"
              >
                닫기
              </button>
            </div>

            <div className="max-h-[calc(92vh-80px)] space-y-4 overflow-y-auto p-5 sm:p-6">
              {loading ? (
                <p className="text-sm text-[#4e5968]">학교 정보를 불러오는 중...</p>
              ) : null}
              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

              {!loading && !error && data ? (
                <div className="space-y-3">
                  {data.results.map((result, index) => (
                    <section
                      key={`${result.apiType}_${index}`}
                      className="rounded-2xl border border-[#e6eef9] bg-[#fcfdff] p-4"
                    >
                      <h4 className="text-sm font-bold text-[#191f28]">{TITLE[result.apiType]}</h4>
                      {/*<p className="mt-1 text-xs text-[#6b7684]">status: {result.status}</p>*/}
                      <div className="mt-2">
                        <SchoolRenderSelected {...result} />
                      </div>
                    </section>
                  ))}
                </div>
              ) : null}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
