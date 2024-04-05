/*
 * libmedia mp4 stsz box parser
 *
 * 版权所有 (C) 2024 赵高兴
 * Copyright (C) 2024 Gaoxing Zhao
 *
 * 此文件是 libmedia 的一部分
 * This file is part of libmedia.
 * 
 * libmedia 是自由软件；您可以根据 GNU Lesser General Public License（GNU LGPL）3.1
 * 或任何其更新的版本条款重新分发或修改它
 * libmedia is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.1 of the License, or (at your option) any later version.
 * 
 * libmedia 希望能够为您提供帮助，但不提供任何明示或暗示的担保，包括但不限于适销性或特定用途的保证
 * 您应自行承担使用 libmedia 的风险，并且需要遵守 GNU Lesser General Public License 中的条款和条件。
 * libmedia is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 */

import IOReader from 'common/io/IOReader'
import Stream from '../../../AVStream'
import { Atom, MOVContext, MOVStreamContext } from '../type'
import * as logger from 'common/util/logger'

// @ts-ignore
@synchronize
export default async function read(ioReader: IOReader, stream: Stream, atom: Atom, movContext: MOVContext) {
  const now = ioReader.getPos()

  const version = await ioReader.readUint8()
  // flags
  ioReader.skip(3)

  const sampleSizes: number[] = []
  let sampleSize = 0
  let sampleCount = 0

  if (version === 0) {
    sampleSize = await ioReader.readUint32()
    sampleCount = await ioReader.readUint32()

    for (let i = 0; i < sampleCount; i++) {
      if (sampleSize === 0) {
        sampleSizes.push(await ioReader.readUint32())
      }
      else {
        sampleSizes[i] = sampleSize
      }
    }
  }

  (stream.privData as MOVStreamContext).sampleSizes = sampleSizes

  const remainingLength = atom.size - Number(ioReader.getPos() - now)
  if (remainingLength > 0) {
    await ioReader.skip(remainingLength)
  }
  else if (remainingLength < 0) {
    logger.error(`read stsz error, size: ${atom.size}, read: ${atom.size - remainingLength}`)
  }
}
