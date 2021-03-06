import { BotTurn, BridgeTurn } from "narratory"

export const infectedYesterday: BotTurn[] = [
    {
        cond: {
            infected_yesterday: true,
        },
        say: "_infected_yesterday nya fall rapporerades igår.",
        goto: "VERIFY_ANSWER"
    },
    {
        say: "",
        goto: "VERIFY_ANSWER"
    }
]

export const rememberDifference: BotTurn = {
    say: "Kom ihåg att olika länder inte är jämförbara eftersom testerna utförs på olika sätt.",
    goto: "VERIFY_ANSWER"
}

export const answerInfected: Array<BridgeTurn | BotTurn> = [
    {
        cond: {
            infected: null,
        },
        bot: [
            {
                cond: {
                    region: true
                },
                say: "Tyvärr saknar jag data för antal bekräftade fall i _region_label.",
                goto: "VERIFY_ANSWER"
            },
            {
                cond: {
                    country: true
                },
                say: "Tyvärr saknar jag data för antal bekräftade fall i _country.",
                goto: "VERIFY_ANSWER"
            }
        ]
    },
    {
        cond: {
            infected_per_100000_ppl: true
        },
        bot: [
            {
                cond: {
                    region: true
                },
                say: "_region_label har totalt _infected bekräftade fall av covid19, vilket motsvarar _infected_per_100000_ppl per 100000 invånare.",
                bot: infectedYesterday
            },
            {
                say: "Sverige har totalt _infected bekräftade fall av covid19, vilket motsvarar _infected_per_100000_ppl per 100000 invånare.",
                bot: infectedYesterday
            }
        ]
    },
    {
        cond: {
            infected_per_100000_ppl: null
        }, bot: [
            {
                cond:
                    { region: true },
                say: "_region_label har totalt _infected bekräftade fall av covid19",
                bot: infectedYesterday
            },
            {
                cond: { country: "sverige" },
                say: "_country Sverige har totalt _infected bekräftade fall av covid19",
                bot: infectedYesterday
            },
            {
                cond: { country: true },
                bot: [
                    {
                        cond: {
                            recovered: true
                        },
                        say: "_country har totalt _infected bekräftade fall av covid19, av vilka _recovered har tillfrisknat.",
                        bot: rememberDifference
                    },
                    {
                        say: "_country har totalt _infected bekräftade fall av covid19.",
                        bot: rememberDifference
                    }
                ]
            },
            {
                say: "Tyvärr har jag ingen global siffra i nuläget, men Sverige har totalt _infected bekräftade fall av covid19.",
                goto: "VERIFY_ANSWER"
            }
        ]
    }
]



