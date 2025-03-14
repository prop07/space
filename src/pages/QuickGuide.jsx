import { IoIosSearch } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IoShareOutline } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSave } from "react-icons/md";
import { GoDot } from "react-icons/go";
import { MdOutlinePublishedWithChanges } from "react-icons/md";

const QuickGuide = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 mt-4">
      <h1 className="mb-8 text-center text-2xl sm:text-3xl font-bold">
        Quick Guide
      </h1>
      <div className="mb-12 rounded-md border border-default-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
          Creating a New Space
        </h2>
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span>1</span>
            </div>
            <p>Navigate to the space search screen</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span>2</span>
            </div>
            <p>
              Click the
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-1  border border-muted-foreground/50  text-sm font-medium mx-2">
                Create Space +
              </span>
              button
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span>3</span>
            </div>
            <p>Now you are redirected to your new space</p>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-default-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
          Finding an Existing Space
        </h2>
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span>1</span>
            </div>
            <p>Navigate to the space search screen</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span>2</span>
            </div>
            <p>Enter the space code in the search field</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span>3</span>
            </div>
            <p>
              Click the
              <span className="inline-flex items-center rounded-md bg-muted p-1">
                <FaArrowRight className="h-4 w-4" />
              </span>
              button or press Enter to view space
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md border border-dashed border-muted-foreground/50 bg-muted/50 p-4">
          <div className="flex items-center gap-2">
            <IoIosSearch className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">
              Tip: Space codes are typically alphanumeric, special character and
              case-sensitive
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl mt-10 ">
        <div className="mb-8 rounded-md border border-default-border p-6 shadow-sm">
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
            Using Your Space List
          </h2>
          {/* Instructions */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <strong className=" font-extrabold">+</strong>
              </div>
              <div>
                <p className="font-medium">Adding Items</p>
                <p className="text-sm text-muted-foreground">
                  Simply click the &quot;List anything...&quot; and start adding
                  on field
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MdOutlinePublishedWithChanges className=" h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Changing list</p>
                <p className="text-sm text-muted-foreground">
                  Click on list to change, view or update it
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MdOutlineSave className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Save space</p>
                <p className="text-sm text-muted-foreground flex items-center">
                  Click on the <LuCopy className="h-3 w-3 mx-2" /> icon to copy
                  space code or Bookmark space on your browser
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IoSettingsOutline className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Organizing Items</p>
                <p className="text-sm text-muted-foreground flex justify-center items-center">
                  Click on the list <HiDotsVertical classNamame="mx-2" /> icon
                  to perform an action
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <IoShareOutline className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Sharing Your List</p>
                <p className="text-sm text-muted-foreground">
                  Click the share button and share link to collaborate with
                  others
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-default-border p-6 shadow-sm">
          <h2 className="mb-4 text-xl sm:text-2xl font-semibold">
            Tips for Effective List Management
          </h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <GoDot className=" h-4 w-4" />
              <span>Keep items short and actionable</span>
            </li>
            <li className="flex items-center gap-2">
              <GoDot className=" h-4 w-4" />
              <span>Use consistent formatting for similar items</span>
            </li>
            <li className="flex items-center gap-2">
              <GoDot className=" h-4 w-4" />
              <span>Review and clean up your list regularly</span>
            </li>
            <li className="flex items-center gap-2">
              <GoDot className=" h-4 w-4" />
              <span>Share with collaborators for team tasks</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuickGuide;
