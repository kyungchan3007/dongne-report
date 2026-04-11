import {SelectedSectionType} from "@/entities/report/model/types";
import {MapMarker} from "@/widgets/apt-summary/ui/AptSummaryCard";

type Porps = {
    selectedSection: SelectedSectionType | null;
}


function mapSelectedSectionToMarkers(
    selectedSection: SelectedSectionType | null,
): MapMarker[] {
    if (!selectedSection) return [];

    if ("top5" in selectedSection) {
        return selectedSection.top5.map((item) => ({
            x: item.x,
            y: item.y,
            title: item.name,
            marker:"/images/baby.svg"
        }));
    }

    if ("top10" in selectedSection) {
        return selectedSection.top10.map((item) => ({
            x: item.x,
            y: item.y,
            title: item.name,
            marker:"/images/baby.svg"
        }));
    }

    if ("subwayTop3" in selectedSection) {
        return [...selectedSection.subwayTop3, ...selectedSection.busTop5].map((item) => ({
            x: item.x,
            y: item.y,
            title: item.name,
            marker:"/images/baby.svg"
        }));
    }

    if ("place" in selectedSection) {
        return selectedSection.place.map((item) => ({
            x: item.x,
            y: item.y,
            title: item.place_name,
            marker:"/images/baby.svg"
        }));
    }

    return [];
}


export const usePinHooks = ({selectedSection}:Porps) => {
    const markers = mapSelectedSectionToMarkers(selectedSection);


    return {
        markers,
    }
}