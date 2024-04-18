function MenteeCard({ profileImage, name, usn, branch, year, email }) {
  return (
    <div className='flex flex-col bg-primary-card h-auto w-64 p-4 rounded-md items-center space-y-3'>
      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="ProfileImg" className='w-24 h-24 rounded-lg mb-2'/>
      <div className="space-y-3">
      <h3 className='text-xl mb-2 text-center'>{name}</h3>
      <p className='text-sm mb-1 text-left'>USN: {usn}</p>
      <p className='text-sm mb-1 text-left'>Branch: {branch}</p>
      <p className='text-sm mb-1 text-left'>Year: {year}</p>
      <p className='text-sm mb-4 text-left'>{email}</p>
      </div>
      <button className='bg-btn-color-green text-white px-4 py-2 rounded-lg hover:bg-white hover:text-btn-color-green transition-colors duration-200'>Academic Details</button>
    </div>
  )
}

export default MenteeCard