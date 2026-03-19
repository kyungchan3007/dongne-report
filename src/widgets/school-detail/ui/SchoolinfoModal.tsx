import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useSchoolInfo } from "@/features/school-details/hooks/useSchoolInfo";
import { SchoolRenderSelected } from "@/widgets/school-detail/ui/schoolInfo/SchoolRenderSelected";
import { TITLE } from "@/entities/school/model/SchoolType";
import { KakaoMiniMap } from "@/widgets/kakao-map/ui/KakaoMiniMap";

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
  console.log(data);
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-y-auto p-4">
        <div className="mx-auto max-w-3xl">
          <DialogPanel className="rounded-lg bg-white p-4 shadow-xl">
            <DialogTitle className="text-lg font-semibold">{schoolName}</DialogTitle>

            {loading ? <p className="mt-3 text-sm">Loading...</p> : null}
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

            {!loading && !error && data ? (
              <div className="mt-4 space-y-4">
                {data.results.map((result) => (
                  <section key={result.apiType} className="rounded border p-3">
                    <h4 className="font-medium">{TITLE[result.apiType]}</h4>
                    <p className="text-xs text-slate-500">status: {result.status}</p>
                    <SchoolRenderSelected {...result} />
                  </section>
                ))}
              </div>
            ) : null}

            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={onClose}
                className="rounded border px-3 py-1.5 text-sm"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
