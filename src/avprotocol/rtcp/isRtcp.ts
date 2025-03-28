/*
 * libmedia judge is rtcp packet
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

import { Uint8ArrayInterface } from 'common/io/interface'

export default function isRtcp(data: Uint8ArrayInterface) {
  return data.length > 4
    // DOC: https://tools.ietf.org/html/draft-ietf-avtcore-rfc5764-mux-fixes
    && (data[0] > 127 && data[0] < 192)
    // RTP Version must be 2.
    && (data[0] >>> 6) === 2
    // RTCP packet types defined by IANA:
    // http://www.iana.org/assignments/rtp-parameters/rtp-parameters.xhtml#rtp-parameters-4
    // RFC 5761 (RTCP-mux) states this range for secure RTCP/RTP detection.
    && (data[1] >= 192 && data[1] <= 223)
}
