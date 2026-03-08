type Props = {
  message?: string;
};

export function AptDetailError({ message }: Props) {
  return <p className="text-sm text-red-600">리포트 로딩 실패: {message ?? "Unknown error"}</p>;
}
