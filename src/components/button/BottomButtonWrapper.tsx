export default function BottomButtonWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white py-10 pb-[4rem] flex justify-center">
      {children}
    </div>
  );
}
