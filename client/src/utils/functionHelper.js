import moment from 'moment'

export const convertUTCTime = (time) => {
  const UTC = moment(time).format("YYYY-MM-DDTHH:mm:ss.000").toString();
  return moment(`${UTC}Z`);
}

export const getUserType = (user) => {
  if (!user) return ''

  if (user.is_team_member && moment().isBefore(convertUTCTime(user.team_member_expire_at))) {
    return 'family'
  } else if (user.is_current_plan && moment().isBefore(convertUTCTime(user.expire_at))) {
    return 'premium'
  } else {
    return 'free'
  }
}

export const getUserExpireAt = user => {
  if (!user) return ''

  if (user.is_team_member && moment().isBefore(convertUTCTime(user.team_member_expire_at))) {
    return convertUTCTime(user.team_member_expire_at)
  } else if (user.is_current_plan && moment().isBefore(convertUTCTime(user.expire_at))) {
    return convertUTCTime(user.expire_at)
  } else if (user.free_trial_expire_at && moment().isBefore(convertUTCTime(user.free_trial_expire_at))) {
    return convertUTCTime(user.free_trial_expire_at)
  }
}
