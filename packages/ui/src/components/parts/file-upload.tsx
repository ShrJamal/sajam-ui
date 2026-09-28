"use client"

import { cn } from "cn"
import { FileIcon, UploadIcon, XIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button.js"

// A drop zone backed by a native file input. The input always holds the listed files, so
// forms submit them and `required` validation works.
function FileUpload({
  className,
  id,
  files: filesProp,
  defaultFiles = [],
  onFilesChange,
  onFileReject,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  name,
  required,
  disabled = false,
  getRemoveLabel = defaultRemoveLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  children,
  ...props
}: Props) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [uncontrolledFiles, setUncontrolledFiles] = React.useState(defaultFiles)
  const [dragging, setDragging] = React.useState(false)
  const files = filesProp ?? uncontrolledFiles

  React.useEffect(
    function () {
      syncInputFiles(inputRef.current, files)
    },
    [files],
  )

  function updateFiles(nextFiles: File[]) {
    if (filesProp === undefined) {
      setUncontrolledFiles(nextFiles)
    }
    onFilesChange?.(nextFiles)
  }

  function addFiles(selected: File[]) {
    const accepted: File[] = []
    const room = multiple ? (maxFiles ?? Infinity) - files.length : 1
    for (const file of selected) {
      const reason =
        accept && !acceptsFile(file, accept)
          ? "type"
          : maxSize !== undefined && file.size > maxSize
            ? "size"
            : accepted.length >= room
              ? "count"
              : undefined
      if (reason) {
        onFileReject?.(file, reason)
      } else if (
        !multiple ||
        ![...files, ...accepted].some(function (existing) {
          return isSameFile(existing, file)
        })
      ) {
        accepted.push(file)
      }
    }

    // Undo the browser's replacement of the input's files until the new list renders.
    syncInputFiles(inputRef.current, files)
    if (accepted.length > 0) {
      updateFiles(multiple ? [...files, ...accepted] : accepted)
    }
  }

  return (
    <div
      data-slot="file-upload"
      className={cn("grid w-full gap-2", className)}
      {...props}
    >
      <label
        htmlFor={inputId}
        data-slot="file-upload-dropzone"
        data-dragging={dragging || undefined}
        data-disabled={disabled || undefined}
        className="border-input text-muted-foreground hover:bg-muted/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 data-dragging:border-primary data-dragging:bg-primary/5 dark:bg-input/30 dark:hover:bg-input/50 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center text-sm transition-colors has-focus-visible:ring-3 has-aria-invalid:ring-3 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-6"
        onDragEnter={function (event) {
          if (!disabled) {
            event.preventDefault()
            setDragging(true)
          }
        }}
        onDragOver={function (event) {
          if (!disabled) {
            event.preventDefault()
            event.dataTransfer.dropEffect = "copy"
          }
        }}
        onDragLeave={function (event) {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setDragging(false)
          }
        }}
        onDrop={function (event) {
          setDragging(false)
          if (!disabled) {
            event.preventDefault()
            addFiles(Array.from(event.dataTransfer.files))
          }
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          data-slot="file-upload-input"
          type="file"
          className="sr-only"
          name={name}
          accept={accept}
          multiple={multiple}
          required={required}
          disabled={disabled}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          onChange={function (event) {
            addFiles(Array.from(event.currentTarget.files ?? []))
          }}
        />
        {children ?? (
          <>
            <UploadIcon aria-hidden="true" />
            <span className="text-foreground font-medium">
              {multiple ? "Drop files or click to browse" : "Drop a file or click to browse"}
            </span>
          </>
        )}
      </label>
      {files.length > 0 ? (
        <ul
          data-slot="file-upload-list"
          className="grid gap-2"
        >
          {files.map(function (file, index) {
            return (
              <li
                key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
                data-slot="file-upload-item"
                className="flex min-w-0 items-center gap-3 rounded-lg border py-1.5 pr-1.5 pl-3"
              >
                <FileIcon
                  className="text-muted-foreground size-4 shrink-0"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{file.name}</span>
                  <span className="text-muted-foreground block text-xs">
                    {formatBytes(file.size)}
                  </span>
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={getRemoveLabel(file)}
                  disabled={disabled}
                  onClick={function () {
                    updateFiles(
                      files.filter(function (_, fileIndex) {
                        return fileIndex !== index
                      }),
                    )
                    inputRef.current?.focus()
                  }}
                >
                  <XIcon />
                </Button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

type FileRejectReason = "type" | "size" | "count"

type Props = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  files?: File[]
  defaultFiles?: File[]
  onFilesChange?: (files: File[]) => void
  onFileReject?: (file: File, reason: FileRejectReason) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  name?: string
  required?: boolean
  disabled?: boolean
  getRemoveLabel?: (file: File) => string
}

function defaultRemoveLabel(file: File) {
  return `Remove ${file.name}`
}

function syncInputFiles(input: HTMLInputElement | null, files: File[]) {
  if (!input || typeof DataTransfer === "undefined") {
    return
  }

  const transfer = new DataTransfer()
  for (const file of files) {
    transfer.items.add(file)
  }
  input.files = transfer.files
}

// Matches the input's `accept` syntax: extensions, exact MIME types, and `type/*` wildcards.
function acceptsFile(file: File, accept: string) {
  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()
  return accept.split(",").some(function (rule) {
    const pattern = rule.trim().toLowerCase()
    if (pattern.startsWith(".")) {
      return name.endsWith(pattern)
    }
    if (pattern.endsWith("/*")) {
      return type.startsWith(pattern.slice(0, -1))
    }
    return pattern !== "" && type === pattern
  })
}

function isSameFile(a: File, b: File) {
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  const units = ["KB", "MB", "GB"]
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length)
  return `${(bytes / 1024 ** exponent).toFixed(1)} ${units[exponent - 1]}`
}

export { FileUpload, type FileRejectReason }
