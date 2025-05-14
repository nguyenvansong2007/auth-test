import React, {useState} from "react";
import { Home, Settings, ChevronDown, Filter, Folder, X } from "lucide-react"

const addMember = () => {

const [email, setEmail] = useState("")
  const [members, setMembers] = useState<
    { email: string; firstName: string; lastName: string; company: string; role: string; accessLevel: string }[]
  >([])
  const [selectAll, setSelectAll] = useState(false)

  const handleAddEmail = () => {
    if (email && email.includes("@") && !members.some((m) => m.email === email)) {
      setMembers([
        ...members,
        {
          email,
          firstName: "",
          lastName: "",
          company: "",
          role: "Project Member",
          accessLevel: "Standard",
        },
      ])
      setEmail("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddEmail()
    }
  }

  const handleSelectAll = () => {
    setSelectAll(!selectAll)
  }

  const handleRemoveMember = (emailToRemove: string) => {
    setMembers(members.filter((m) => m.email !== emailToRemove))
  }

  return (
    <div>
      {/* Main content */}
      <main className="flex-1 px-4 md:px-6 pb-6">
        <h1 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
          Add account members
        </h1>

        <div className="flex items-center mb-2 text-sm text-gray-600">
          <span>Maximum 100 email addresses *</span>
          <div className="ml-1 w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center text-xs">
            i
          </div>
        </div>

        <div className="flex mb-4">
          <div className="relative flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="person@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddEmail}
            className="px-4 py-3 bg-gray-100 border border-l-0 border-gray-300 rounded-r hover:bg-gray-200"
          >
            Enter
          </button>
        </div>

        <button className="mb-4 p-2 border border-gray-300 rounded bg-white hover:bg-gray-50">
          <Filter className="h-5 w-5 text-gray-600" />
        </button>

        <div className="bg-white border border-gray-200 rounded-t">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email*
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  First Name
                  <span className="inline-block ml-1 w-4 h-4 rounded-full border border-gray-400 text-center text-xs">
                    i
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Last Name
                  <span className="inline-block ml-1 w-4 h-4 rounded-full border border-gray-400 text-center text-xs">
                    i
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Default Role
                  <span className="inline-block ml-1 w-4 h-4 rounded-full border border-gray-400 text-center text-xs">
                    i
                  </span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Access Level
                </th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            {members.length > 0 && (
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {member.email}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <input
                        type="text"
                        placeholder="Company"
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <select className="w-full p-1 border border-gray-300 rounded text-sm">
                        <option>Project Member</option>
                        <option>Project Admin</option>
                        <option>Account Admin</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <select className="w-full p-1 border border-gray-300 rounded text-sm">
                        <option>Standard</option>
                        <option>Limited</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleRemoveMember(member.email)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {members.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 border-t border-gray-200">
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <Folder className="h-12 w-12 text-blue-300" />
              </div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                You haven't added anyone yet
              </h2>
              <p className="text-gray-600 text-sm">
                Add emails and press Enter to populate the table.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default addMember;
