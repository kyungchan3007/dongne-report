import { NextResponse } from "next/server";
import iconv from "iconv-lite";
import * as cheerio from "cheerio";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TARGET_URL = "https://www.schoolinfo.go.kr/ei/pp/Pneipp_b44_s0p.do";

type SemesterAchievement = {
  average: number | null;
  a: number | null;
  b: number | null;
  c: number | null;
  d: number | null;
  e: number | null;
};

type SubjectAchievement = {
  grade: number;
  subjectCode: string;
  subjectName: string;
  semester1: SemesterAchievement;
  semester2: SemesterAchievement;
};

function parseNumber(value: string): number | null {
  const normalized = value.replace(/\s+/g, "").replace(/,/g, "").trim();

  if (!normalized || normalized === "-" || normalized === "") {
    return null;
  }

  const num = Number(normalized);
  return Number.isNaN(num) ? null : num;
}

function parseSemester(cells: cheerio.Cheerio<any>, startIndex: number): SemesterAchievement {
  return {
    average: parseNumber(cells.eq(startIndex).text()),
    a: parseNumber(cells.eq(startIndex + 1).text()),
    b: parseNumber(cells.eq(startIndex + 2).text()),
    c: parseNumber(cells.eq(startIndex + 3).text()),
    d: parseNumber(cells.eq(startIndex + 4).text()),
    e: parseNumber(cells.eq(startIndex + 5).text()),
  };
}

function parseGradeTable($: cheerio.CheerioAPI, grade: number): SubjectAchievement[] {
  const rows: SubjectAchievement[] = [];

  $(`#GRADE_${grade} tbody tr`).each((_, tr) => {
    const subjectTh = $(tr).find("th.js-sungchi").first();
    const tds = $(tr).find("td");

    if (!subjectTh.length) return;
    if (tds.length < 12) return;

    const subjectCode = subjectTh.attr("data-sbjt-cd")?.trim() ?? "";
    const subjectName = subjectTh.text().replace(/\s+/g, " ").trim();

    rows.push({
      grade,
      subjectCode,
      subjectName,
      semester1: parseSemester(tds, 0),
      semester2: parseSemester(tds, 6),
    });
  });

  return rows;
}

export async function GET() {
  try {
    const body = new URLSearchParams({
      SHL_IDF_CD: "5bb799cd-2782-4aee-9ae5-c03aef73f712",
      GS_BURYU_CD: "JG220",
      GS_HANGMOK_CD: "44",
      JG_BURYU_CD: "JG040",
      JG_HANGMOK_CD: "15",
      JG_GUBUN: "1",
      JG_YEAR: "2025",
      JG_CHASU: "3",
      adminYN: "N",
      isCaptcha: "N",
      JG_INVE_TME: "1",
      SORT: "BR",
      POP_YN: "",
      CHOSEN_JG_YEAR: "2025",
      LOAD_TYPE: "single",
      passLine: "219420",
    });

    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer:
          "https://www.schoolinfo.go.kr/ei/pp/Pneipp_b44_s0p.do?SHL_IDF_CD=5bb799cd-2782-4aee-9ae5-c03aef73f712&GS_BURYU_CD=JG220&GS_HANGMOK_CD=44&JG_BURYU_CD=JG040&JG_HANGMOK_CD=15&JG_GUBUN=1&JG_YEAR=2025&JG_CHASU=3&adminYN=N&isCaptcha=N&JG_INVE_TME=1&SORT=BR&POP_YN=&CHOSEN_JG_YEAR=2025&LOAD_TYPE=single",
        Cookie:
          "WMONID=PsQG-tlQbyy; JSESSIONID=cM192WNXCDlALj1v1WKK4p31Nd09FthhDM8clyaA1RSVELvmtOR1U491l0hMMjYf.YmFzZV9kb21haW4vbmdzX3NjYTE=; cookieRecmSchulCode=4541fc38-2561-4cf0-9af7-8fd191a29911%2Ce901e4f2-886e-4bd3-a53c-d83b555b3dd3%2C5bb799cd-2782-4aee-9ae5-c03aef73f712",
      },
      body: body.toString(),
      cache: "no-store",
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    const html = iconv.decode(buffer, "euc-kr");

    const isCaptchaPage =
      html.includes("CaptChaImg.jsp") ||
      html.includes("changeCaptcha44") ||
      html.includes("passLine44");

    if (isCaptchaPage) {
      return NextResponse.json({
        ok: false,
        status: response.status,
        message: "captcha page returned",
      });
    }

    const $ = cheerio.load(html);

    const grade1 = parseGradeTable($, 1);
    const grade2 = parseGradeTable($, 2);
    const grade3 = parseGradeTable($, 3);

    const data = [...grade1, ...grade2, ...grade3];

    return NextResponse.json({
      ok: true,
      status: response.status,
      summary: {
        grade1Count: grade1.length,
        grade2Count: grade2.length,
        grade3Count: grade3.length,
        totalCount: data.length,
      },
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "unknown error",
      },
      { status: 500 }
    );
  }
}
