import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Evaluation, Person } from '../types';
import { RATING_QUESTIONS, OPEN_QUESTIONS } from '../data/surveyData';

function getRatingColor(value: number): string {
  if (value <= 3) return '#ef4444';
  if (value <= 5) return '#f97316';
  if (value <= 7) return '#eab308';
  return '#22c55e';
}

function getRatingBg(value: number): string {
  if (value <= 3) return '#fef2f2';
  if (value <= 5) return '#fff7ed';
  if (value <= 7) return '#fefce8';
  return '#f0fdf4';
}

function getRatingLabel(value: number): string {
  if (value <= 2) return 'ضعيف جداً';
  if (value <= 4) return 'ضعيف';
  if (value <= 6) return 'متوسط';
  if (value <= 8) return 'جيد';
  return 'ممتاز';
}

function buildReportHTML(
people: Person[],
evaluations: Record<number, Evaluation>,
surveyorName?: string)
: string {
  const completedPeople = people.filter((p) => evaluations[p.id]?.isComplete);
  const today = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const surveyorLabel = surveyorName ? surveyorName : 'غير محدد';

  let personSections = '';

  completedPeople.forEach((person, idx) => {
    const evaluation = evaluations[person.id];

    // Calculate average
    const ratingValues = Object.values(evaluation.ratings);
    const avg =
    ratingValues.length > 0 ?
    (
    ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length).
    toFixed(1) :
    '—';

    // Rating rows
    let ratingRows = '';
    RATING_QUESTIONS.forEach((q) => {
      const val = evaluation.ratings[q.id];
      const displayVal = val !== undefined ? val : '—';
      const color = val !== undefined ? getRatingColor(val) : '#94a3b8';
      const bg = val !== undefined ? getRatingBg(val) : '#f8fafc';
      const label = val !== undefined ? getRatingLabel(val) : '—';

      ratingRows += `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 14px; font-size: 13px; color: #334155; text-align: right; width: 55%;">${q.text}</td>
          <td style="padding: 10px 14px; text-align: center; width: 15%;">
            <span style="display: inline-block; width: 36px; height: 36px; line-height: 36px; border-radius: 50%; background: ${bg}; color: ${color}; font-weight: 700; font-size: 15px; text-align: center;">${displayVal}</span>
          </td>
          <td style="padding: 10px 14px; text-align: center; font-size: 12px; color: ${color}; font-weight: 600; width: 15%;">${label}</td>
          <td style="padding: 10px 14px; width: 15%;">
            <div style="background: #e2e8f0; border-radius: 999px; height: 8px; overflow: hidden;">
              <div style="background: ${color}; height: 100%; width: ${val ? val * 10 : 0}%; border-radius: 999px;"></div>
            </div>
          </td>
        </tr>
      `;
    });

    // Open answers
    let openAnswersHTML = '';
    const hasOpenAnswers = OPEN_QUESTIONS.some((q) =>
    evaluation.openAnswers[q.id]?.trim()
    );

    if (hasOpenAnswers) {
      let openRows = '';
      OPEN_QUESTIONS.forEach((q) => {
        const answer = evaluation.openAnswers[q.id]?.trim();
        if (answer) {
          openRows += `
            <div style="margin-bottom: 14px; padding: 14px 16px; background: #f8fafc; border-radius: 10px; border-right: 3px solid #d97706;">
              <div style="font-size: 12px; color: #d97706; font-weight: 700; margin-bottom: 6px;">${q.text}</div>
              <div style="font-size: 13px; color: #334155; line-height: 1.7;">${answer}</div>
            </div>
          `;
        }
      });

      openAnswersHTML = `
        <div style="margin-top: 20px;">
          <div style="font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #f59e0b;">
            الأسئلة المفتوحة
          </div>
          ${openRows}
        </div>
      `;
    }

    const avgColor =
    avg !== '—' ? getRatingColor(parseFloat(avg as string)) : '#94a3b8';

    personSections += `
      <div style="page-break-inside: avoid; margin-bottom: 32px; ${idx > 0 ? 'page-break-before: always;' : ''}">
        <!-- Person Header -->
        <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 14px; padding: 20px 24px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">${person.name}</div>
            <div style="font-size: 13px; color: #f59e0b; font-weight: 600;">${person.role}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">المعدل العام</div>
            <div style="font-size: 28px; font-weight: 800; color: ${avgColor};">${avg}</div>
            <div style="font-size: 10px; color: #64748b;">من 10</div>
          </div>
        </div>

        <!-- Ratings Table -->
        <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <thead>
            <tr style="background: #f1f5f9;">
              <th style="padding: 12px 14px; font-size: 12px; color: #64748b; font-weight: 600; text-align: right;">البند</th>
              <th style="padding: 12px 14px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center;">الدرجة</th>
              <th style="padding: 12px 14px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center;">المستوى</th>
              <th style="padding: 12px 14px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center;">المؤشر</th>
            </tr>
          </thead>
          <tbody>
            ${ratingRows}
          </tbody>
        </table>

        ${openAnswersHTML}
      </div>
    `;
  });

  // Summary section
  const allAverages = completedPeople.map((p) => {
    const vals = Object.values(evaluations[p.id].ratings);
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  });

  let summaryRows = '';
  completedPeople.forEach((person, i) => {
    const avg = allAverages[i];
    const color = getRatingColor(Math.round(avg));
    summaryRows += `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 14px; font-size: 13px; color: #334155; font-weight: 600; text-align: right;">${person.name}</td>
        <td style="padding: 10px 14px; font-size: 12px; color: #64748b; text-align: center;">${person.role}</td>
        <td style="padding: 10px 14px; text-align: center;">
          <span style="font-size: 16px; font-weight: 700; color: ${color};">${avg.toFixed(1)}</span>
        </td>
        <td style="padding: 10px 14px; width: 25%;">
          <div style="background: #e2e8f0; border-radius: 999px; height: 8px; overflow: hidden;">
            <div style="background: ${color}; height: 100%; width: ${avg * 10}%; border-radius: 999px;"></div>
          </div>
        </td>
      </tr>
    `;
  });

  return `
    <div id="pdf-report" style="font-family: 'Tajawal', 'Segoe UI', Tahoma, sans-serif; direction: rtl; width: 780px; padding: 40px; background: #ffffff; color: #1e293b;">
      
      <!-- Report Header -->
      <div style="text-align: center; margin-bottom: 36px; padding-bottom: 24px; border-bottom: 3px solid #f59e0b;">
        <div style="font-size: 12px; color: #d97706; font-weight: 700; letter-spacing: 2px; margin-bottom: 8px;">تقرير سري</div>
        <div style="font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 6px;">نتائج الاستبيان الإداري</div>
        <div style="font-size: 14px; color: #64748b; margin-bottom: 12px;">تقييم أداء المسؤولين والمدراء</div>
        <div style="display: inline-flex; gap: 24px; font-size: 12px; color: #94a3b8;">
          <span>المُقيّم: ${surveyorLabel}</span>
          <span>التاريخ: ${today}</span>
          <span>عدد التقييمات: ${completedPeople.length} من ${people.length}</span>
        </div>
      </div>

      <!-- Summary Table -->
      <div style="margin-bottom: 36px;">
        <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; width: 4px; height: 24px; background: #f59e0b; border-radius: 4px;"></span>
          ملخص النتائج
        </div>
        <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <thead>
            <tr style="background: linear-gradient(135deg, #0f172a, #1e293b);">
              <th style="padding: 12px 14px; font-size: 12px; color: #f59e0b; font-weight: 600; text-align: right;">الاسم</th>
              <th style="padding: 12px 14px; font-size: 12px; color: #f59e0b; font-weight: 600; text-align: center;">المنصب</th>
              <th style="padding: 12px 14px; font-size: 12px; color: #f59e0b; font-weight: 600; text-align: center;">المعدل</th>
              <th style="padding: 12px 14px; font-size: 12px; color: #f59e0b; font-weight: 600; text-align: center;">المؤشر</th>
            </tr>
          </thead>
          <tbody>
            ${summaryRows}
          </tbody>
        </table>
      </div>

      <!-- Individual Reports -->
      <div style="font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
        <span style="display: inline-block; width: 4px; height: 24px; background: #f59e0b; border-radius: 4px;"></span>
        التقارير التفصيلية
      </div>
      ${personSections}

      <!-- Footer -->
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
        <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">هذا التقرير سري ومخصص لأغراض التطوير الإداري فقط</div>
        <div style="font-size: 13px; color: #64748b; font-weight: 600;">قسم السكرتارية الخاصة والتنفيذية — سعاد علي</div>
      </div>
    </div>
  `;
}

export async function generateSurveyPdf(
people: Person[],
evaluations: Record<number, Evaluation>,
surveyorName?: string)
: Promise<void> {
  // Create temporary container
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.zIndex = '-1';
  container.innerHTML = buildReportHTML(people, evaluations, surveyorName);
  document.body.appendChild(container);

  const reportEl = container.querySelector('#pdf-report') as HTMLElement;

  // Wait for fonts to load
  await document.fonts.ready;
  // Small delay for rendering
  await new Promise((r) => setTimeout(r, 300));

  try {
    const canvas = await html2canvas(reportEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 860
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20; // 10mm margins
    const imgHeight = canvas.height * imgWidth / canvas.width;

    let heightLeft = imgHeight;
    let position = 10; // top margin

    // First page
    pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 20;

    // Additional pages
    while (heightLeft > 0) {
      position = -(pdfHeight - 20) + position + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 20;
    }

    pdf.save('تقرير-الاستبيان-الإداري.pdf');
  } finally {
    document.body.removeChild(container);
  }
}