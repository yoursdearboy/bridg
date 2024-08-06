import os
import subprocess
import tempfile
from io import open  # Give 2 and 3 use same newline behaviour.

from webassets.exceptions import FilterError
from webassets.filter import Filter

__all__ = ("TypeScript",)


class TypeScript(Filter):
    """Compile  `TypeScript <http://www.typescriptlang.org>`_ to JavaScript.

    TypeScript is an external tool written for NodeJS.
    This filter assumes that the ``tsc`` executable is in the path. Otherwise, you
    may define the ``TYPESCRIPT_BIN`` setting.

    To specify TypeScript compiler options, ``TYPESCRIPT_CONFIG`` may be defined.
    E.g.: ``--removeComments true --target ES6``.
    """

    name = "typescript"
    max_debug_level = None
    options = {"binary": "TYPESCRIPT_BIN", "config": "TYPESCRIPT_CONFIG"}

    def open(self, out, source_path, **kw):
        output_filename = tempfile.mktemp() + ".js"

        args = [self.binary or "tsc", "--outfile", output_filename, source_path]
        if self.config:
            args += self.config.split()
        proc = subprocess.Popen(
            args,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            shell=(os.name == "nt"),
        )
        stdout, stderr = proc.communicate()
        if proc.returncode != 0:
            raise FilterError(
                "typescript: subprocess had error: stderr=%s," % stderr
                + "stdout=%s, returncode=%s" % (stdout, proc.returncode)
            )

        with open(output_filename, "r") as f:
            out.write(f.read())

        os.unlink(output_filename)
