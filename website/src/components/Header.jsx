export const Header = () => {
    const signIn = () => {
        return null
    }

    return (
        <div className="flex bg-gray-200 shadow justify-end py-4 px-8">
            <div className="flex h-full" onClick={() => signIn()}>
                <h2 className="text-lg">Sign in</h2>
            </div>
        </div>
    )
}