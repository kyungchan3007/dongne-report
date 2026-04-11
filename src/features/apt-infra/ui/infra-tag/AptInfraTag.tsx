import {summaryTags} from "@/features/apt-infra/model/AptModel";
import {SummaryTagKey} from "@/entities/report/model/types";

type Props = {
    onTagClick?: (key: SummaryTagKey) => void;
}
export const AptInfraTag = ({onTagClick}:Props) => {
    return (
        <div className="flex flex-1 flex-wrap gap-2">
            {summaryTags.map(({ label, icon: Icon, className, key }) => (
                <span
                    key={label}
                    className={[
                        "inline-flex items-center gap-2 rounded-2xl border border-white/70 px-3 py-1.5 text-sm font-medium",
                        "transition-all duration-200 hover:cursor-pointer",
                        className,
                    ].join(" ")}
                    onClick={() => onTagClick?.(key)}
                >
              <Icon size={16} strokeWidth={2.2} />
              <span>{label}</span>
            </span>
            ))}
        </div>
    )
}
