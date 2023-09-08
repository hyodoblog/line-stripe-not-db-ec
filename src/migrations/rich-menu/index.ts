import '../../alias'

import { RichMenu } from '@line/bot-sdk'
import { readFileSync } from 'fs'
import { join } from 'path'
import { lineClient } from '~/utils/line'
import { richmenuData1 } from './1'

const allDeleteRichmenu = async (): Promise<void> => {
  const richmenuIds: string[] = (await lineClient.getRichMenuList()).map((value) => value.richMenuId)
  await Promise.all(richmenuIds.map((richmenuId) => lineClient.deleteRichMenu(richmenuId)))
}

const createRichmenu = async (imgPath: string, richmenu: RichMenu, isDefault = false): Promise<string> => {
  const imgFile = readFileSync(imgPath)

  const richmenuId = await lineClient.createRichMenu(richmenu)
  await lineClient.setRichMenuImage(richmenuId, imgFile)

  if (isDefault) {
    await lineClient.setDefaultRichMenu(richmenuId)
  }

  return richmenuId
}

;(async () => {
  try {
    await allDeleteRichmenu()

    const imgPath = join(__dirname, '../../../assets/rich-menu.png')
    await createRichmenu(imgPath, richmenuData1, true)

    console.info('finish.')
  } catch (err) {
    console.error(err)
  }
})()
