import './globals.css'

export const metadata = {
  title: 'Mental Care',
  description: 'Mental health awareness platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
