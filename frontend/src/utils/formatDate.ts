export const formatDate = (_date: string) => {
  const date = new Date(_date);
  return `${date.getUTCHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const formatDateDB = (_date: string) => {
  const date = new Date(_date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1> 9 ? date.getMonth() : `0${date.getMonth()}`
  const day = date.getDate()> 9 ? date.getDate() : `0${date.getDate()}`
  const hour = date.getUTCHours() > 9 ?  date.getUTCHours() : `0${date.getUTCHours()}`
  const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  return `${year}-${month}-${day}T${hour}:${minute}`
};
