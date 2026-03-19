type Props = {
  message?: string;
};

export function AptDetailError({ message }: Props) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
      리포트를 불러오지 못했습니다. {message ?? "Unknown error"}
    </div>
  );
}
