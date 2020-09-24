import { request } from '@/services/fetch'

export const getPojectFinancialBias = (prarms) => request('/H_roleplay-si/ds/list/getPojectFinancialBias', prarms)