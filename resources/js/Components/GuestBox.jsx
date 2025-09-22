const GuestBox = ({ children }) => {
    return (
        <div className="pt-16 pb-10 px-3 max-h-full overflow-y-auto scrollbar-hidden">
            <div className="rounded-2xl bg-white px-2 py-4 guest-box">
                {children}
            </div>
        </div>
    )
}
export default GuestBox;