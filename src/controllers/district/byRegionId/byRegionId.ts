import { Router } from 'express'
import { auth } from '../../../auth'
import { getDistrictByRegionId } from '../../../routes/district/districtsByRegionId'

const distrcitsByRegionId = Router()

distrcitsByRegionId.get('/:regionId', auth, getDistrictByRegionId)
export default distrcitsByRegionId
