import { OneSignal } from "react-native-onesignal"

export const TagUserInfoCreate = () => {
  OneSignal.User.addTags({
    'user_name': 'Júnior Dering',
    'user_email': 'juniordering@hotmail.com',
  })
}
