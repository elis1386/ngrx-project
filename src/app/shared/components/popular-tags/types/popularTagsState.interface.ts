import { PopularTagType } from "src/app/shared/types/popularTag.type";

export interface PopularTagStateInterface {
    isLoading: boolean;
    error: string | null;
    data: PopularTagType[] | null;
}