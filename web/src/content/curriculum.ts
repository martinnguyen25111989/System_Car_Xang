export type LessonMeta = {
  id: string
  title: string
  question: string
  available: boolean
}

export type LevelMeta = {
  id: number
  title: string
  blurb: string
  lessons: LessonMeta[]
}

export const levels: LevelMeta[] = [
  {
    id: 1,
    title: 'Nền tảng',
    blurb: 'Nhìn cả chiếc xe trước khi tách từng cụm máy.',
    lessons: [
      {
        id: 'L01',
        title: 'Xe xăng hoạt động thế nào',
        question: 'Xe xăng biến xăng thành chuyển động ra sao?',
        available: true,
      },
      {
        id: 'L02',
        title: 'Kiến trúc xe',
        question: 'Chassis, body, powertrain và các hệ thống lớn nằm ở đâu?',
        available: true,
      },
      {
        id: 'L03',
        title: 'Các loại xe',
        question: 'ICE, HEV, PHEV và BEV khác nhau ở kiến trúc nào?',
        available: true,
      },
      {
        id: 'L04',
        title: 'Năm luồng trên một chiếc xe',
        question: 'Năng lượng, cơ khí, điện, dữ liệu và nhiệt đi những đường nào?',
        available: true,
      },
    ],
  },
  {
    id: 2,
    title: 'Powertrain xăng',
    blurb: 'Từ giọt xăng đến mô-men trên trục khuỷu.',
    lessons: [
      {
        id: 'L05',
        title: 'Cụm máy',
        question: 'Block, piston, trục khuỷu và trục cam nằm với nhau thế nào?',
        available: true,
      },
      {
        id: 'L06',
        title: 'Chu trình 4 thì',
        question: 'Nạp, nén, nổ, xả tạo mô-men ra sao?',
        available: true,
      },
      {
        id: 'L07',
        title: 'Nạp, cháy, xả',
        question: 'Không khí, xăng và khí thải đi những đường nào trong máy?',
        available: true,
      },
      {
        id: 'L08',
        title: 'Hút khí tự nhiên, turbo, siêu nạp',
        question: 'Vì sao có xe hút khí tự nhiên và có xe tăng áp?',
        available: true,
      },
      {
        id: 'L09',
        title: 'Đường xăng',
        question: 'Từ bình xăng tới kim phun, port và direct khác nhau chỗ nào?',
        available: true,
      },
      {
        id: 'L10',
        title: 'Đường khí và đường xả',
        question: 'MAF, xúc tác, EGR và EVAP mỗi thứ giữ vai trò gì?',
        available: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Khung gầm',
    blurb: 'Đưa mô-men ra bánh, rồi rẽ, dừng và giữ xe ổn định.',
    lessons: [
      {
        id: 'L11',
        title: 'Hộp số',
        question: 'Ly hợp, số sàn, số tự động, CVT và DCT khác nhau thế nào?',
        available: true,
      },
      {
        id: 'L12',
        title: 'Từ mô-men tới bánh',
        question: 'Mô-men đi qua hộp số, vi sai và trục láp ra sao?',
        available: true,
      },
      {
        id: 'L13',
        title: 'FWD, RWD, AWD, 4WD',
        question: 'Bánh nào nhận lực, và các kiểu dẫn động khác nhau khi nào?',
        available: true,
      },
      {
        id: 'L14',
        title: 'Phanh',
        question: 'Từ bàn đạp tới má phanh, ABS làm gì khi phanh gấp?',
        available: true,
      },
      {
        id: 'L15',
        title: 'Lái',
        question: 'Vô-lăng quay thành góc đánh lái bằng cơ cấu nào?',
        available: true,
      },
      {
        id: 'L16',
        title: 'Treo',
        question: 'Lò xo và giảm chấn chia nhau việc gì?',
        available: true,
      },
      {
        id: 'L17',
        title: 'Lốp và bánh',
        question: 'Các số trên lốp và độ chụm có nghĩa gì?',
        available: true,
      },
    ],
  },
  {
    id: 4,
    title: 'Điện và điện tử',
    blurb: 'Mạch 12V, các hộp điều khiển và cảm biến của máy xăng.',
    lessons: [
      {
        id: 'L18',
        title: 'Mạch 12V',
        question: 'Ắc quy, máy phát, cầu chì và máy đề nối nhau thế nào?',
        available: true,
      },
      {
        id: 'L19',
        title: 'Bản đồ ECU',
        question: 'Cảm biến, ECU và cơ cấu chấp hành tạo một vòng điều khiển ra sao?',
        available: true,
      },
      {
        id: 'L20',
        title: 'Cảm biến máy xăng',
        question: 'Mỗi cảm biến đo gì và ECU dùng số đó để làm gì?',
        available: true,
      },
      {
        id: 'L21',
        title: 'Nhiệt và điều hòa',
        question: 'Nước làm mát và gas lạnh mỗi vòng đi qua đâu?',
        available: true,
      },
    ],
  },
  {
    id: 5,
    title: 'Mạng và phần mềm',
    blurb: 'Chiếc xe là nhiều máy tính nói chuyện với nhau.',
    lessons: [
      {
        id: 'L22',
        title: 'Mạng xe',
        question: 'CAN và các bus khác giống một message bus ở chỗ nào?',
        available: true,
      },
      {
        id: 'L23',
        title: 'OBD và mã lỗi',
        question: 'P0300, P0420 và P0171 gợi ý hỏng ở đoạn nào của chuỗi?',
        available: true,
      },
      {
        id: 'L24',
        title: 'Phần mềm ECU',
        question: 'Firmware, AUTOSAR và OTA nằm ở tầng nào của xe?',
        available: true,
      },
    ],
  },
  {
    id: 6,
    title: 'An toàn và ADAS',
    blurb: 'Giữ bánh bám đường, và giảm hậu quả khi va chạm.',
    lessons: [
      {
        id: 'L25',
        title: 'An toàn chủ động',
        question: 'ABS, ESC và AEB can thiệp vào xe lúc nào?',
        available: true,
      },
      {
        id: 'L26',
        title: 'An toàn bị động',
        question: 'Túi khí và vùng hấp thụ va chạm làm việc khi nào?',
        available: true,
      },
      {
        id: 'L27',
        title: 'ADAS',
        question: 'Camera và radar biến thành quyết định giữ làn ra sao?',
        available: true,
      },
    ],
  },
  {
    id: 7,
    title: 'Nội thất',
    blurb: 'Chỗ người lái dùng xe mỗi ngày.',
    lessons: [
      {
        id: 'L28',
        title: 'Nội thất',
        question: 'Ghế, cửa, đèn và cụm đồng hồ gắn với điện xe thế nào?',
        available: true,
      },
      {
        id: 'L29',
        title: 'Giải trí',
        question: 'Màn hình nói với phần còn lại của xe qua đâu?',
        available: true,
      },
    ],
  },
  {
    id: 8,
    title: 'Ghép thành một hệ thống',
    blurb: 'Bảo dưỡng, chẩn đoán, và bản đồ cả chiếc xe xăng.',
    lessons: [
      {
        id: 'L30',
        title: 'Kiến trúc cả xe',
        question: 'Các hộp và hệ thống xe xăng ghép thành một sơ đồ thế nào?',
        available: true,
      },
      {
        id: 'L31',
        title: 'Bảo dưỡng',
        question: 'Xe xăng cần thay những gì, và khác hybrid hay xe điện ở đâu?',
        available: true,
      },
      {
        id: 'L32',
        title: 'Chẩn đoán',
        question: 'Triệu chứng nào trỏ tới cụm nào?',
        available: true,
      },
    ],
  },
]

export function findLesson(id: string): { level: LevelMeta; lesson: LessonMeta } | null {
  for (const level of levels) {
    const lesson = level.lessons.find((item) => item.id === id)
    if (lesson) return { level, lesson }
  }
  return null
}

export const lessonCount = levels.reduce((sum, level) => sum + level.lessons.length, 0)
