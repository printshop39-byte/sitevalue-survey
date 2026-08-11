import math
V={'A':(422.44,188.96),'B':(281.32,214.04),'C':(270.52,215.96),'D':(276.28,245.72),
   'E':(283.12,277.52),'F':(445.84,242.12),'G':(432.64,212.12),'H':(427.24,199.88),
   'P1':(284.56,229.64),'P2':(287.92,243.20)}
K=(25.4/72)*500/1000.0
def L(a,b): return math.hypot(V[a][0]-V[b][0],V[a][1]-V[b][1])*K

POLY={'2457/1':['D','G','F','E'],'2457/2':['P1','H','G','P2'],
      '2457/3':['B','A','H','P1'],'2457/4':['C','B','P1','P2','D']}
AREA={'2457/1':164.06,'2457/2':62.30,'2457/3':62.30,'2457/4':10.54}
OWNER={'2457/1':'श्री. नेमिनाथ','2457/2':'श्री. देवाप्पा','2457/3':'श्री. आदिनाथ','2457/4':'तिघे सामाईक'}
FILL={'2457/1':'var(--p1)','2457/2':'var(--p2)','2457/3':'var(--p3)','2457/4':'var(--p4)'}

def esc(s): return s

# ---------- MAIN PLAN ----------
def main_plan():
    S=5.0; mx=132; my=88
    xs=[p[0] for p in V.values()]; ys=[p[1] for p in V.values()]
    x0,y0=min(xs),min(ys)
    def T(k):
        x,y=V[k]; return ((x-x0)*S+mx,(y-y0)*S+my)
    def TP(x,y): return ((x-x0)*S+mx,(y-y0)*S+my)
    def lerp(a,b,t):
        (x1,y1),(x2,y2)=T(a),T(b); return (x1+(x2-x1)*t, y1+(y2-y1)*t)
    W=(max(xs)-x0)*S+2*mx; H=(max(ys)-y0)*S+2*my
    o=[]
    o.append(f'<svg viewBox="0 0 {W:.0f} {H:.0f}" role="img" aria-label="सि.स.नं. 2457 चा प्रमाणबद्ध नकाशा — चार पोटहिस्से, बाजूंची मापे व लगतचे मिळकत क्रमांक" class="plan">')
    for name,pl in POLY.items():
        pts=' '.join('%.1f,%.1f'%T(k) for k in pl)
        o.append(f'<polygon points="{pts}" fill="{FILL[name]}" stroke="none"/>')
    for a,b in [('D','G'),('P1','H'),('B','P1'),('P1','P2'),('P2','D')]:
        (x1,y1),(x2,y2)=T(a),T(b)
        o.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="var(--accent)" stroke-width="1.7" stroke-dasharray="8 4"/>')
    outer=['C','B','A','H','G','F','E','D']
    pts=' '.join('%.1f,%.1f'%T(k) for k in outer)
    o.append(f'<polygon points="{pts}" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>')
    for k in outer+['P1','P2']:
        x,y=T(k); o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="3.2" fill="var(--surface)" stroke="currentColor" stroke-width="1.5"/>')
    def dim(a,b,off,cls='dim',t=0.5):
        (x1,y1),(x2,y2)=T(a),T(b)
        dx,dy=x2-x1,y2-y1; ln=math.hypot(dx,dy)
        nx,ny=dy/ln,-dx/ln
        px,py=x1+dx*t+nx*off, y1+dy*t+ny*off
        ang=math.degrees(math.atan2(dy,dx))
        if ang>90: ang-=180
        if ang<-90: ang+=180
        o.append(f'<text x="{px:.1f}" y="{py:.1f}" transform="rotate({ang:.1f} {px:.1f} {py:.1f})" class="{cls}" text-anchor="middle">{L(a,b):.2f}</text>')
    for a,b,off in [('C','B',-19),('B','A',-19),('A','H',-24),('H','G',-46),('G','F',-24),
                    ('F','E',-24),('E','D',-24),('D','C',36)]:
        dim(a,b,off)
    dim('D','G',15,'dim dim-in',0.26)
    dim('P1','H',15,'dim dim-in',0.26)
    VL={'A':(1,-.4),'B':(-.6,-1),'C':(-1,-.5),'D':(-1,.2),'E':(-.7,1),'F':(1,.5),'G':(.9,.6),'H':(1,-.1)}
    for k,(ux,uy) in VL.items():
        x,y=T(k)
        o.append(f'<text x="{x+ux*15:.1f}" y="{y+uy*15+4:.1f}" class="vx" text-anchor="middle">{k}</text>')
    for k,(ux,uy) in {'P1':(-1.1,-.5),'P2':(-1.1,.6)}.items():
        x,y=T(k)
        o.append(f'<text x="{x+ux*15:.1f}" y="{y+uy*15+4:.1f}" class="vx vx-in" text-anchor="middle">{"P"+k[1]}</text>')
    LT={'2457/1':(('D','G'),('E','F'),0.62),'2457/2':(('P2','G'),('P1','H'),0.62),
        '2457/3':(('P1','H'),('B','A'),0.60)}
    for name,(e1,e2,t) in LT.items():
        p=lerp(*e1,t); q=lerp(*e2,t)
        cx,cy=(p[0]+q[0])/2,(p[1]+q[1])/2
        o.append(f'<text x="{cx:.1f}" y="{cy-3:.1f}" class="pl-no" text-anchor="middle">{name}</text>')
        o.append(f'<text x="{cx:.1f}" y="{cy+13:.1f}" class="pl-ar" text-anchor="middle">{AREA[name]*10.7639:,.2f} चौ.फूट</text>')
    # 2457/4 gets an outside label with a leader
    ax,ay=T('C'); bx,by=T('P2')
    hx,hy=(ax+bx)/2,(ay+by)/2
    lx,ly=hx-104,hy+66
    o.append(f'<line x1="{lx+72:.1f}" y1="{ly-12:.1f}" x2="{hx:.1f}" y2="{hy:.1f}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>')
    o.append(f'<text x="{lx:.1f}" y="{ly:.1f}" class="pl-no" text-anchor="start">2457/4</text>')
    o.append(f'<text x="{lx:.1f}" y="{ly+15:.1f}" class="pl-ar" text-anchor="start">10.54 चौ.मी.</text>')
    NB=[('सि.स.नं. 2460',309.0,199.0),('सि.स.नं. 2453/5',381.5,184.0),('सि.स.नं. 2461',264.0,199.0),
        ('सि.स.नं. 2463',252.0,266.0),('सि.स.नं. 2496/1',312.0,289.0),('सि.स.नं. 2496/2',368.0,280.0),
        ('सि.स.नं. 2496/3',422.0,267.0)]
    for t_,x,y in NB:
        X,Y=TP(x,y)
        o.append(f'<text x="{X:.1f}" y="{Y:.1f}" class="nb" text-anchor="middle">{t_}</text>')
    X,Y=TP(455,216)
    o.append(f'<text x="{X:.1f}" y="{Y:.1f}" class="nb" text-anchor="middle" transform="rotate(66 {X:.1f} {Y:.1f})">लागू रस्ता</text>')
    nx,ny=W-46,66
    o.append(f'<line x1="{nx}" y1="{ny+44}" x2="{nx}" y2="{ny+9}" stroke="currentColor" stroke-width="1.7"/>')
    o.append(f'<polygon points="{nx},{ny} {nx-5},{ny+12} {nx+5},{ny+12}" fill="currentColor"/>')
    o.append(f'<text x="{nx}" y="{ny+60}" class="nb" text-anchor="middle">उत्तर</text>')
    seg=(5.0/K)*S; sx,sy=W-seg-mx,H-34
    o.append(f'<line x1="{sx}" y1="{sy}" x2="{sx+seg:.1f}" y2="{sy}" stroke="currentColor" stroke-width="2"/>')
    for t_ in (0,1):
        o.append(f'<line x1="{sx+seg*t_:.1f}" y1="{sy-5}" x2="{sx+seg*t_:.1f}" y2="{sy+5}" stroke="currentColor" stroke-width="2"/>')
    o.append(f'<text x="{sx+seg/2:.1f}" y="{sy+19}" class="nb" text-anchor="middle">5 मी.  (प्रमाण 1:500)</text>')
    o.append('</svg>')
    return '\n'.join(o)

# ---------- DETAIL ----------
def detail(name):
    pl=POLY[name]; pts=[V[k] for k in pl]
    # longest side -> horizontal
    best=max(range(len(pl)),key=lambda i:math.dist(pts[i],pts[(i+1)%len(pl)]))
    p,q=pts[best],pts[(best+1)%len(pl)]
    th=-math.atan2(q[1]-p[1],q[0]-p[0])
    c=(sum(x for x,_ in pts)/len(pts),sum(y for _,y in pts)/len(pts))
    R=[( (x-c[0])*math.cos(th)-(y-c[1])*math.sin(th), (x-c[0])*math.sin(th)+(y-c[1])*math.cos(th)) for x,y in pts]
    if math.sin(th-math.pi/2) > 0:      # keep north pointing up in every detail
        R=[(-x,-y) for x,y in R]; th+=math.pi
    W,H=540,232; pad=78
    xs=[x for x,_ in R]; ys=[y for _,y in R]
    sc=min((W-2*pad)/(max(xs)-min(xs)),(H-2*pad)/max(1e-6,(max(ys)-min(ys))))
    ox=(W-(max(xs)-min(xs))*sc)/2-min(xs)*sc
    oy=(H-(max(ys)-min(ys))*sc)/2-min(ys)*sc
    P=[(x*sc+ox,y*sc+oy) for x,y in R]
    sa=sum(P[i][0]*P[(i+1)%len(P)][1]-P[(i+1)%len(P)][0]*P[i][1] for i in range(len(P)))
    BB=[]
    o=['@@SVGTAG@@']
    o.append(f'<polygon points="{" ".join("%.1f,%.1f"%p for p in P)}" fill="{FILL[name]}" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>')
    for i in range(len(P)):
        j=(i+1)%len(P)
        x1,y1=P[i]; x2,y2=P[j]
        dx,dy=x2-x1,y2-y1; ln=math.hypot(dx,dy)
        nx,ny=(dy/ln,-dx/ln)
        gx=sum(a for a,_ in P)/len(P); gy=sum(b for _,b in P)/len(P)
        mxp,myp=(x1+x2)/2,(y1+y2)/2
        if (mxp+nx-gx)**2+(myp+ny-gy)**2 < (mxp-nx-gx)**2+(myp-ny-gy)**2:
            nx,ny=-nx,-ny
        off=20 if ln>60 else 24
        tx,ty=mxp+nx*off,myp+ny*off+4
        ang=math.degrees(math.atan2(dy,dx))
        if ang>90: ang-=180
        if ang<-90: ang+=180
        o.append(f'<text x="{tx:.1f}" y="{ty:.1f}" transform="rotate({ang:.1f} {tx:.1f} {ty:.1f})" class="dim" text-anchor="middle">{L(pl[i],pl[j])*3.28084:.2f} फूट</text>')
        ex_=44 if abs(ang)<45 else 14; ey_=14 if abs(ang)<45 else 44
        BB.append((tx-ex_,ty-ey_)); BB.append((tx+ex_,ty+ey_))
        BB.append((x1,y1))
        o.append(f'<circle cx="{x1:.1f}" cy="{y1:.1f}" r="2.6" fill="var(--surface)" stroke="currentColor" stroke-width="1.3"/>')
    cx=sum(x for x,_ in P)/len(P); cy=sum(y for _,y in P)/len(P)
    o.append(f'<text x="{cx:.1f}" y="{cy-3:.1f}" class="pl-no" text-anchor="middle">{name}</text>')
    o.append(f'<text x="{cx:.1f}" y="{cy+13:.1f}" class="pl-ar" text-anchor="middle">{AREA[name]*10.7639:,.2f} चौ.फूट</text>')
    # north arrow rotated by th
    ax,ay=W-36,40; a2=th-math.pi/2
    ex,ey=ax+24*math.cos(a2),ay+24*math.sin(a2)
    o.append(f'<line x1="{ax:.1f}" y1="{ay:.1f}" x2="{ex:.1f}" y2="{ey:.1f}" stroke="currentColor" stroke-width="1.4"/>')
    pdx,pdy=math.cos(a2),math.sin(a2)
    o.append(f'<polygon points="{ex+pdx*6:.1f},{ey+pdy*6:.1f} {ex-pdy*4:.1f},{ey+pdx*4:.1f} {ex+pdy*4:.1f},{ey-pdx*4:.1f}" fill="currentColor"/>')
    o.append(f'<text x="{ex+pdx*16:.1f}" y="{ey+pdy*16+4:.1f}" class="nb" text-anchor="middle">उ</text>')
    BB.append((ex+pdx*16-13,ey+pdy*16-17)); BB.append((ex+pdx*16+13,ey+pdy*16+11))
    BB.append((ax-8,ay-8)); BB.append((ax+8,ay+8))
    BB.append((cx-58,cy-20)); BB.append((cx+58,cy+26))
    vx0=min(b[0] for b in BB)-8; vy0=min(b[1] for b in BB)-8
    vw=max(b[0] for b in BB)+8-vx0; vh=max(b[1] for b in BB)+8-vy0
    o[0]=(f'<svg viewBox="{vx0:.0f} {vy0:.0f} {vw:.0f} {vh:.0f}" role="img" '
          f'aria-label="{name} — सर्व बाजूंची मापे मीटरमध्ये" class="det">')
    o.append('</svg>')
    return '\n'.join(o)

for n in POLY: open('det_%s.svg'%n.replace('/','_'),'w').write(detail(n))
print('ok')
