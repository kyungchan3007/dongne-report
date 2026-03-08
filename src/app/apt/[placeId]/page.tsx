import { AptDetailPage } from "@/pages/apt/ui/AptDetailPage";

type Props = {
  params: Promise<{ placeId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AptReportPage({ params, searchParams }: Props) {
  const { placeId } = await params;
  const query = await searchParams;

  const readOne = (key: string) => {
    const value = query[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return (
    <AptDetailPage
      placeId={placeId}
      x={readOne("x")}
      y={readOne("y")}
      name={readOne("name")}
      address={readOne("address")}
    />
  );
}
