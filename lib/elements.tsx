import { SCALE_FACTOR } from './constants';

const Domain = ({ domain }: { domain: string }) => {
  return (
    <p style={{ fontSize: 24 * SCALE_FACTOR, color: '#747474' }}>{domain}</p>
  );
};

const PreviewImage = ({ imageBase64 }: { imageBase64: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: 460 * SCALE_FACTOR,
        height: 394 * SCALE_FACTOR,
        marginLeft: 34 * SCALE_FACTOR,
        borderRadius: `${8 * SCALE_FACTOR}px ${8 * SCALE_FACTOR}px 0px 0px`,
        overflow: 'hidden',
        border: '1px solid #f5f5f5',
        boxShadow: `0px -${4 * SCALE_FACTOR}px ${
          32 * SCALE_FACTOR
        }px 0px rgb(0, 0, 0, 0.08)`,
      }}
    >
      <img
        src={`data:image/png;base64, ${imageBase64}`}
        style={{ objectFit: 'contain', width: '100%' }}
      />
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  const fontSize = title.length > 30 ? 24 * SCALE_FACTOR : 20 * SCALE_FACTOR;
  return (
    <h1
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        fontWeight: 700,
        fontSize: fontSize * SCALE_FACTOR,
        lineHeight: 1.1,
        letterSpacing: '-0.005em',
      }}
    >
      {title}
    </h1>
  );
};

export { Domain, PreviewImage, Title };
