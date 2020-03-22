import { UserTurn, EXIT } from "narratory"
import * as nlu from "./nlu"
import { simpleQuestionAnswers } from "./answers/generatedFAQ"
import { answerProtect } from "./answers/answerProtect"
import { answerRegion } from "./answers/answerRegion"
import { answerStayHome } from "./answers/answerStayhome"
import { answerFamily } from "./answers/answerFamily"
import { answerHelp } from "./answers/answerHelp"
import { followupAge } from "./followup/followupAge"

/*
    Questions and other user-driven initiatives
*/

const exit: UserTurn = {
  intent: nlu.exit,
  bot: {
    say: "Hejdå!",
    goto: EXIT
  }
}

const questions: UserTurn[] = [
  ...simpleQuestionAnswers,
  {
    intent: nlu.hasSymptoms,
    bot:
      "Okej. Då är det viktigt att du stannar hemma för att förhindra spridning. Du kan också ringa 1177, och få rådgivning från en sjuksköterska."
  },
  {
    intent: nlu.queryHowToProtect,
    bot: answerProtect
  },
  {
    intent: nlu.queryRegionStatus,
    bot: answerRegion
  },
  {
    intent: nlu.queryStayHome,
    bot: answerStayHome
  },
  {
    intent: nlu.queryTakeCareOfFamily,
    bot: answerFamily
  },
  {
    intent: nlu.queryHelp,
    bot: answerHelp
  },
  {
    intent: nlu.querySocializing,
    bot: followupAge
  }
]

export default [...questions, exit]
