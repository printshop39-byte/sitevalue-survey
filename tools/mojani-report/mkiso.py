# -*- coding: utf-8 -*-
"""SketchUp-शैलीतील isometric 3D दृश्य — सि.स.नं. 2457 चे चार पोटहिस्से."""
import math
V={'A':(422.44,188.96),'B':(281.32,214.04),'C':(270.52,215.96),'D':(276.28,245.72),
   'E':(283.12,277.52),'F':(445.84,242.12),'G':(432.64,212.12),'H':(427.24,199.88),
   'P1':(284.56,229.64),'P2':(287.92,243.20)}
K=(25.4/72)*500/1000.0; FT=3.28084; SQFT=10.7639
POLY={'2457/1':['D','G','F','E'],'2457/2':['P1','H','G','P2'],
      '2457/3':['B','A','H','P1'],'2457/4':['C','B','P1','P2','D']}
AREA={'2457/1':164.06,'2457/2':62.30,'2457/3':62.30,'2457/4':10.54}
OWNER={'2457/1':'नेमिनाथ','2457/2':'देवाप्पा','2457/3':'आदिनाथ','2457/4':'सामाईक'}
TOP={'2457/1':'var(--p1)','2457/2':'var(--p2)','2457/3':'var(--p3)','2457/4':'var(--p4)'}
SIDE={'2457/1':'var(--p1s)','2457/2':'var(--p2s)','2457/3':'var(--p3s)','2457/4':'var(--p4s)'}
OUTER=['C','B','A','H','G','F','E','D']

TILT=-12.3            # पट्टा पूर्व-पश्चिम सरळ करण्यासाठी
H=2.6                 # extrusion उंची (मी.) — फक्त दृश्य स्पष्टतेसाठी
S=13.0                # px per metre
C30,S30=math.cos(math.radians(30)),math.sin(math.radians(30))

x0=min(p[0] for p in V.values()); y0=max(p[1] for p in V.values())
def world(v):
    x,y=V[v]; X=(x-x0)*K; Y=(y0-y)*K
    t=math.radians(TILT)
    return (X*math.cos(t)-Y*math.sin(t), X*math.sin(t)+Y*math.cos(t))
W={v:world(v) for v in V}
def iso(p,z=0.0):
    X,Y=p
    return ((X-Y)*C30*S, -(((X+Y)*S30)+z)*S)
def depth(p): return p[0]+p[1]

def build():
    BB=[]
    def bb(x,y,w=0,h=0): BB.append((x-w,y-h)); BB.append((x+w,y+h))
    o=['@@TAG@@']
    # --- जमिनीची सावली ---
    # --- बाजूचे (उभे) पृष्ठभाग: फक्त दिसणारे, मागून पुढे ---
    faces=[]
    for k,pl in POLY.items():
        for i in range(len(pl)):
            a,b=pl[i],pl[(i+1)%len(pl)]
            pa,pb=W[a],W[b]
            nx,ny=(pb[1]-pa[1]),-(pb[0]-pa[0])
            cx=sum(W[v][0] for v in pl)/len(pl); cy=sum(W[v][1] for v in pl)/len(pl)
            mx,my=(pa[0]+pb[0])/2,(pa[1]+pb[1])/2
            if (mx+nx-cx)**2+(my+ny-cy)**2 < (mx-nx-cx)**2+(my-ny-cy)**2: nx,ny=-nx,-ny
            if nx+ny>=-0.001: continue                     # दर्शकाकडे नसलेले पृष्ठ वगळा
            faces.append((depth(((pa[0]+pb[0])/2,(pa[1]+pb[1])/2)),a,b,k))
    faces.sort(reverse=True)
    for _,a,b,k in faces:
        pts=[iso(W[a],H),iso(W[b],H),iso(W[b],0),iso(W[a],0)]
        o.append('<polygon points="%s" fill="%s" stroke="var(--edge)" stroke-width="1"/>'%(
            ' '.join('%.1f,%.1f'%p for p in pts),SIDE[k]))
    # --- वरचे पृष्ठभाग ---
    for k,pl in POLY.items():
        pts=[iso(W[v],H) for v in pl]
        for p in pts: bb(p[0],p[1],4,4)
        o.append('<polygon points="%s" fill="%s" stroke="var(--edge)" stroke-width="1.4" '
                 'stroke-linejoin="round"/>'%(' '.join('%.1f,%.1f'%p for p in pts),TOP[k]))
    o.append('<polygon points="%s" fill="none" stroke="currentColor" stroke-width="2.4" '
             'stroke-linejoin="round"/>'%(' '.join('%.1f,%.1f'%iso(W[v],H) for v in OUTER)))
    # --- वरच्या पृष्ठावरील नावे ---
    LT={'2457/1':(('D','G'),('E','F'),0.74),'2457/2':(('P2','G'),('P1','H'),0.50),
        '2457/3':(('P1','H'),('B','A'),0.33)}
    for k,pl in POLY.items():
        pts=[iso(W[v],H) for v in pl]
        if k in LT:
            (a1,b1),(a2,b2),t=LT[k]
            def L3(a,b,t):
                pa,pb=iso(W[a],H),iso(W[b],H)
                return (pa[0]+(pb[0]-pa[0])*t, pa[1]+(pb[1]-pa[1])*t)
            q1=L3(a1,b1,t); q2=L3(a2,b2,t)
            cx,cy=(q1[0]+q2[0])/2,(q1[1]+q2[1])/2
        else:
            cx=sum(p[0] for p in pts)/len(pts); cy=sum(p[1] for p in pts)/len(pts)
            lx,ly=cx-104,cy-58
            o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="var(--muted)" '
                     'stroke-width="1" stroke-dasharray="3 3"/>'%(lx+52,ly+6,cx,cy))
            cx,cy=lx,ly
        bb(cx,cy,46,26)
        o.append('<text x="%.1f" y="%.1f" class="iso-no" text-anchor="middle">%s</text>'%(cx,cy-6,k))
        o.append('<text x="%.1f" y="%.1f" class="iso-ar" text-anchor="middle">%s चौ.फूट</text>'%(
            cx,cy+8,format(round(AREA[k]*SQFT,2),',')))
        o.append('<text x="%.1f" y="%.1f" class="iso-ow" text-anchor="middle">%s</text>'%(cx,cy+21,OWNER[k]))
    # --- मापरेषा: लांबी (E–F) व रुंदी (C–E टोक) ---
    def dimline(a,b,off,label):
        pa,pb=iso(W[a]),iso(W[b])
        dx,dy=pb[0]-pa[0],pb[1]-pa[1]; ln=math.hypot(dx,dy)
        nx,ny=dy/ln,-dx/ln
        cx=(iso(W['A'])[0]+iso(W['E'])[0])/2; cy=(iso(W['A'])[1]+iso(W['E'])[1])/2
        if (pa[0]+nx-cx)**2+(pa[1]+ny-cy)**2 < (pa[0]-nx-cx)**2+(pa[1]-ny-cy)**2: nx,ny=-nx,-ny
        qa=(pa[0]+nx*off,pa[1]+ny*off); qb=(pb[0]+nx*off,pb[1]+ny*off)
        o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="var(--muted)" stroke-width="1"/>'%(pa+qa))
        o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="var(--muted)" stroke-width="1"/>'%(pb+qb))
        o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="var(--muted)" stroke-width="1.3"/>'%(qa+qb))
        mx,my=(qa[0]+qb[0])/2,(qa[1]+qb[1])/2
        ang=math.degrees(math.atan2(qb[1]-qa[1],qb[0]-qa[0]))
        if ang>90: ang-=180
        if ang<-90: ang+=180
        bb(mx,my,44,20)
        o.append('<text x="%.1f" y="%.1f" transform="rotate(%.1f %.1f %.1f)" class="iso-dim" '
                 'text-anchor="middle">%s</text>'%(mx,my-5,ang,mx,my-5,label))
    dimline('E','F',30,'96.37 फूट  (29.37 मी.)')
    dimline('C','E',24,'36.38 फूट  (11.09 मी.)')
    # --- उत्तर बाण (जमिनीच्या पातळीवर) ---
    nb0=iso((W['C'][0]-6,W['C'][1]+3)); nb1=iso((W['C'][0]-6,W['C'][1]+9))
    o.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="currentColor" stroke-width="2"/>'%(nb0+nb1))
    dxn,dyn=nb1[0]-nb0[0],nb1[1]-nb0[1]; ln=math.hypot(dxn,dyn); dxn,dyn=dxn/ln,dyn/ln
    o.append('<polygon points="%.1f,%.1f %.1f,%.1f %.1f,%.1f" fill="currentColor"/>'%(
        nb1[0]+dxn*10,nb1[1]+dyn*10, nb1[0]-dyn*6,nb1[1]+dxn*6, nb1[0]+dyn*6,nb1[1]-dxn*6))
    tx,ty=nb1[0]+dxn*26,nb1[1]+dyn*26
    bb(tx,ty,20,14)
    o.append('<text x="%.1f" y="%.1f" class="iso-nb" text-anchor="middle">उत्तर</text>'%(tx,ty+5))
    # --- रस्त्याची बाजू ---
    rx,ry=iso(((W['A'][0]+W['F'][0])/2+7,(W['A'][1]+W['F'][1])/2))
    bb(rx,ry,64,18)
    o.append('<text x="%.1f" y="%.1f" class="iso-nb" text-anchor="middle">लागू रस्ता →</text>'%(rx,ry))
    x0b=min(b[0] for b in BB)-18; x1b=max(b[0] for b in BB)+18
    y0b=min(b[1] for b in BB)-18; y1b=max(b[1] for b in BB)+18
    o[0]=('<svg viewBox="%.0f %.0f %.0f %.0f" role="img" aria-label="सि.स.नं. 2457 चे isometric 3D दृश्य — '
          'चारही पोटहिस्से उंची देऊन दाखवले आहेत" class="iso">'%(x0b,y0b,x1b-x0b,y1b-y0b))
    o.append('</svg>')
    return '\n'.join(o)

open('iso.svg','w').write(build())
print('ok')
