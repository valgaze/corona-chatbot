import { cloudFunction } from "narratory-cloud"
import { notifySlack } from "./util/notifySlack"
import { addToGoogleSheet } from "./util/addToGoogleSheet"

export const confirmWrong = cloudFunction(async (req, res) => {
  try {
    const { classifiedIntentName, classifiedUtterance, botResponse } = req.body
    const promises: Promise<any>[] = []
    const message = `"${classifiedUtterance}" was *classified wrongly* to the question "${classifiedIntentName.replace(
      "question: ",
      ""
    )}"`
    promises.push(notifySlack(message))
    promises.push(
      addToGoogleSheet({
        type: "miss classification",
        userUtterance: classifiedUtterance,
        botReply: Array.isArray(botResponse) ? botResponse.join(". ") : botResponse,
        intentName: classifiedIntentName
      })
    )
    await Promise.all(promises)
    res.json({
      status: "confirmed wrong"
    })
  } catch (err) {
    console.log("Something went wrong logging a wrong-confirmation: " + err)
    console.log(JSON.stringify(err.stack))
    res.status(400).json({
      status: "ERROR",
      message: err.message
    })
  }
})
