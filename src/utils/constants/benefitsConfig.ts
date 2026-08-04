import {
    CertificateIcon,
    CartGrowthIcon,
    ClockIcon,
    CommunityIcon,
    TargetIcon,
} from "../../assets/svg/SvgIcons";

import type { BenefitCardProps } from "../types/Apptypes";

export const benefitsConfig = [

    {

        id: "1",
        title: "Get Certified",
        description: "Earn certificates after completing every course",
        icon: CertificateIcon,
        visualType: "certificate",

    },

    {

        id: "2",
        title: "Track Growth",
        description: "Follow your progress, activity and learning improvement",
        icon: CartGrowthIcon,
        visualType: "growth",

    },

    {

        id: "3",
        title: "Learn Anytime",
        description: "Study comfortably whenever it fits your schedule",
        icon: ClockIcon,
        visualType: "time",

    },

    {

        id: "4",
        title: "Join Community",
        description: "Connect and learn together with other developers",
        icon: CommunityIcon,
        visualType: "community",

    },

    {

        id: "5",
        title: "Stay Focused",
        description: "Use personalised goals to keep your learning on track",
        icon: TargetIcon,
        visualType: "focus",

    },

] satisfies Array<BenefitCardProps & { id: string }>;
