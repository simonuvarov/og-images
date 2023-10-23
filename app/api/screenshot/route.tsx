import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { makeScreenshot, readFontFile } from '@/lib/utils';
import { Domain, PreviewImage, Title } from '@/lib/elements';
import { SCALE_FACTOR } from '@/lib/constants';

export async function GET(req: NextRequest, res: Response) {
  const url = req.nextUrl.searchParams.get('url') as string;

  const interRegularData = await readFontFile('Inter-Regular.ttf');
  const interSemiBuffer = await readFontFile('Inter-SemiBold.ttf');

  const { title, domain, screenshot } = await makeScreenshot({ url });

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'Inter',
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 48 * SCALE_FACTOR,
          paddingTop: 56 * SCALE_FACTOR,
          paddingRight: 56 * SCALE_FACTOR,
          height: '100%',
          overflow: 'hidden',
          backgroundColor: '#f4f4f4',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 310 * SCALE_FACTOR,
            marginBottom: 32 * SCALE_FACTOR,
          }}
        >
          <Title title={title} />
          <Domain domain={domain} />
        </div>
        <PreviewImage imageBase64={screenshot} />
      </div>
    ),
    {
      width: 900 * SCALE_FACTOR,
      height: 450 * SCALE_FACTOR,
      debug: false,
      fonts: [
        {
          name: 'Inter',
          weight: 400,
          data: interRegularData,
        },
        {
          name: 'Inter',
          weight: 600,
          data: interSemiBuffer,
        },
      ],
    }
  );
}
