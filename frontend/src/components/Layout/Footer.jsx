export default function Footer({ profile }) {
  return (
    <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 relative z-10 bg-black">
      <p>
        &copy; {new Date().getFullYear()} {profile?.name || 'Devarshi Mahajan'}. Neural
        Interface v2.1.0
      </p>
    </footer>
  );
}