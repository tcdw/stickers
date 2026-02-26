export default function Footer() {
  return (
    <footer className="py-8 mt-8 bg-muted">
      <div className="container px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2">
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} tcdw. Made with ❤️ for Yukino Wan.</p>
          <p>在本站出现的插画图案均借助生成式 AI 技术生成</p>
        </div>
      </div>
    </footer>
  );
}
