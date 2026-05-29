import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '@/design-system/tokens/colors';
import { motion, radius, shadow, space } from '@/design-system/tokens/space';
import { fontFamily, typeScale } from '@/design-system/tokens/typography';

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const page: React.CSSProperties = {
  padding: 32,
  fontFamily: 'var(--font-body)',
  color: 'var(--color-ink)',
  background: 'var(--color-canvas)',
  minHeight: '100vh',
};

const sectionTitle: React.CSSProperties = {
  margin: '0 0 4px',
  fontSize: 26,
  fontWeight: 700,
  letterSpacing: '-0.26px',
};

const sectionSubtitle: React.CSSProperties = {
  margin: '0 0 24px',
  fontSize: 14,
  color: 'var(--color-ink-mute)',
};

const caption: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--color-ink-mute)',
  fontFamily: 'var(--font-mono)',
};

export const Colors: Story = {
  render: () => (
    <div style={page}>
      <h2 style={sectionTitle}>Colors</h2>
      <p style={sectionSubtitle}>
        {Object.keys(colors).length} color tokens, in declaration order.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 16,
        }}
      >
        {Object.entries(colors).map(([name, value]) => (
          <div
            key={name}
            style={{
              border: '1px solid var(--color-hairline)',
              borderRadius: 12,
              overflow: 'hidden',
              background: 'var(--color-canvas)',
            }}
          >
            <div
              style={{
                height: 72,
                background: value,
                backgroundImage:
                  'linear-gradient(45deg, #0000000d 25%, transparent 25%, transparent 75%, #0000000d 75%), linear-gradient(45deg, #0000000d 25%, transparent 25%, transparent 75%, #0000000d 75%)',
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 8px 8px',
              }}
            >
              <div style={{ height: '100%', background: value }} />
            </div>
            <div style={{ padding: '8px 10px 10px' }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div>
              <div style={{ ...caption, marginTop: 2 }}>{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={page}>
      <h2 style={sectionTitle}>Typography</h2>
      <p style={sectionSubtitle}>
        Type scale rendered with fontFamily.body. Caption shows size / line
        height / tracking.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {Object.entries(typeScale).map(([name, scale]) => (
          <div key={name}>
            <div style={{ ...caption, marginBottom: 6 }}>
              {name} — {scale.size} / {scale.lineHeight} / {scale.tracking}
            </div>
            <div
              style={{
                fontFamily: fontFamily.body,
                fontSize: scale.size,
                lineHeight: scale.lineHeight,
                letterSpacing: scale.tracking,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={page}>
      <h2 style={sectionTitle}>Spacing</h2>
      <p style={sectionSubtitle}>Spacing scale — bar width equals the value.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Object.entries(space).map(([name, value]) => (
          <div
            key={name}
            style={{ display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <div style={{ width: 64, fontSize: 13, fontWeight: 600 }}>
              {name}
            </div>
            <div
              style={{
                width: value,
                height: 16,
                background: 'var(--color-primary)',
                borderRadius: 4,
              }}
            />
            <div style={caption}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={page}>
      <h2 style={sectionTitle}>Radius</h2>
      <p style={sectionSubtitle}>Corner radius scale.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {Object.entries(radius).map(([name, value]) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 96,
                height: 96,
                background: 'var(--color-primary-soft)',
                border: '1px solid var(--color-primary)',
                borderRadius: value,
              }}
            />
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>
              {name}
            </div>
            <div style={caption}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Elevation: Story = {
  render: () => (
    <div style={{ ...page, background: 'var(--color-canvas-soft)' }}>
      <h2 style={sectionTitle}>Elevation</h2>
      <p style={sectionSubtitle}>Box shadow tokens.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {Object.entries(shadow).map(([name, value]) => (
          <div key={name} style={{ width: 200 }}>
            <div
              style={{
                height: 96,
                borderRadius: 12,
                background: 'var(--color-canvas)',
                boxShadow: value,
              }}
            />
            <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600 }}>
              {name}
            </div>
            <div style={{ ...caption, marginTop: 2 }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div style={page}>
      <h2 style={sectionTitle}>Motion</h2>
      <p style={sectionSubtitle}>Easing and duration tokens.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(motion).map(([name, value]) => (
          <div
            key={name}
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
              padding: '12px 16px',
              borderRadius: 8,
              border: '1px solid var(--color-hairline)',
            }}
          >
            <div style={{ width: 160, fontSize: 14, fontWeight: 600 }}>
              {name}
            </div>
            <div style={caption}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};
